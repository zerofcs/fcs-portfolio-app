import fs from "fs-extra";
import path from "path";
import { processedResources } from "./processed-resources";
import { iterateResources, saveFile } from "./site-previewer";
import { InspirationResource, nonCompiledInspiration } from "./insperation";
import puppeteer from "puppeteer";
import sharp from "sharp";

let resources = processedResources as InspirationResource[];

function joinUniqueByUrl(
  priorityArray: InspirationResource[],
  mergingArray: InspirationResource[]
): InspirationResource[] {
  // Create a new Set with urls from the first array for quick lookup
  const urlsSet = new Set(priorityArray.map((obj) => obj.url));

  // Filter the second array, keeping only objects with a url not in the Set
  const uniqueResourcesToMerge = mergingArray.filter(
    (obj) => !urlsSet.has(obj.url)
  );

  // Combine the first array with the filtered second array
  return [...priorityArray, ...uniqueResourcesToMerge];
}

resources = joinUniqueByUrl(resources, nonCompiledInspiration);

const saveProcessedResources = async (resources: InspirationResource[]) => {
  resources = resources.filter((resource) => resource.title);

  const content = `export const processedResources = ${JSON.stringify(
    resources,
    null,
    2
  )};`;

  const scriptPath = __dirname; // Or however you determine your script's directory
  const filePath = path.join(scriptPath, "processed-resources.ts");

  // Using fs.promises to handle this asynchronously
  await fs.promises.writeFile(filePath, content, "utf8");
  console.log(`Processed resources have been saved to ${filePath}`);
};

iterateResources(resources).then(() => saveProcessedResources(resources));

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   // Your SVG content
//   const svgContent = `<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
// <rect width="100" height="100" rx="16" fill="black"/>
// <path d="M35.7346 74.8571C33.9551 74.8571 32.3252 74.4158 30.8449 73.533C29.3645 72.635 28.1832 71.4326 27.3009 69.9258C26.4336 68.419 26 66.7599 26 64.9487C26 63.1223 26.4336 61.4557 27.3009 59.9489C28.1832 58.4421 29.3645 57.2397 30.8449 56.3417C32.3252 55.4437 33.9551 54.9947 35.7346 54.9947H40.9383V45.8168H35.7346C33.9551 45.8168 32.3252 45.3754 30.8449 44.4927C29.3645 43.5947 28.1832 42.3999 27.3009 40.9083C26.4336 39.4015 26 37.7348 26 35.9084C26 34.082 26.4336 32.423 27.3009 30.9314C28.1832 29.4246 29.3645 28.2298 30.8449 27.347C32.3252 26.449 33.9551 26 35.7346 26C37.529 26 39.1664 26.449 40.6467 27.347C42.1271 28.2298 43.3084 29.4246 44.1907 30.9314C45.0729 32.423 45.514 34.082 45.514 35.9084V41.1594H54.5308V35.9084C54.5308 34.082 54.9645 32.423 55.8318 30.9314C56.714 29.4246 57.8879 28.2298 59.3533 27.347C60.8336 26.449 62.471 26 64.2654 26C66.0598 26 67.6897 26.449 69.1551 27.347C70.6355 28.2298 71.8093 29.4246 72.6766 30.9314C73.5589 32.423 74 34.082 74 35.9084C74 37.7348 73.5589 39.4015 72.6766 40.9083C71.8093 42.3999 70.6355 43.5947 69.1551 44.4927C67.6897 45.3754 66.0598 45.8168 64.2654 45.8168H59.1065V54.9947H64.2654C66.0598 54.9947 67.6897 55.4437 69.1551 56.3417C70.6355 57.2397 71.8093 58.4421 72.6766 59.9489C73.5589 61.4557 74 63.1223 74 64.9487C74 66.7599 73.5589 68.419 72.6766 69.9258C71.8093 71.4326 70.6355 72.635 69.1551 73.533C67.6897 74.4158 66.0598 74.8571 64.2654 74.8571C62.471 74.8571 60.8336 74.4158 59.3533 73.533C57.8879 72.635 56.714 71.4326 55.8318 69.9258C54.9645 68.419 54.5308 66.7599 54.5308 64.9487V59.6521H45.514V64.9487C45.514 66.7599 45.0729 68.419 44.1907 69.9258C43.3084 71.4326 42.1271 72.635 40.6467 73.533C39.1664 74.4158 37.529 74.8571 35.7346 74.8571ZM35.7346 70.1997C36.6916 70.1997 37.5589 69.9638 38.3364 69.492C39.129 69.0202 39.757 68.3885 40.2206 67.5971C40.6991 66.7904 40.9383 65.9076 40.9383 64.9487V59.6521H35.7346C34.7925 59.6521 33.9252 59.8956 33.1327 60.3826C32.3551 60.8545 31.7346 61.4937 31.271 62.3004C30.8075 63.0919 30.5757 63.9746 30.5757 64.9487C30.5757 65.9076 30.8075 66.7904 31.271 67.5971C31.7346 68.3885 32.3551 69.0202 33.1327 69.492C33.9252 69.9638 34.7925 70.1997 35.7346 70.1997ZM35.7346 41.1594H40.9383V35.9084C40.9383 34.9343 40.6991 34.0515 40.2206 33.2601C39.757 32.4686 39.129 31.837 38.3364 31.3652C37.5589 30.8933 36.6916 30.6574 35.7346 30.6574C34.7925 30.6574 33.9252 30.8933 33.1327 31.3652C32.3551 31.837 31.7346 32.4686 31.271 33.2601C30.8075 34.0515 30.5757 34.9343 30.5757 35.9084C30.5757 36.8825 30.8075 37.7729 31.271 38.5796C31.7346 39.371 32.3551 40.0027 33.1327 40.4745C33.9252 40.9311 34.7925 41.1594 35.7346 41.1594ZM59.1065 41.1594H64.2654C65.2224 41.1594 66.0897 40.9311 66.8673 40.4745C67.6449 40.0027 68.2654 39.371 68.729 38.5796C69.1925 37.7729 69.4243 36.8825 69.4243 35.9084C69.4243 34.9343 69.1925 34.0515 68.729 33.2601C68.2654 32.4686 67.6449 31.837 66.8673 31.3652C66.0897 30.8933 65.2224 30.6574 64.2654 30.6574C63.3084 30.6574 62.4336 30.8933 61.6411 31.3652C60.8636 31.837 60.243 32.4686 59.7794 33.2601C59.3308 34.0515 59.1065 34.9343 59.1065 35.9084V41.1594ZM64.2654 70.1997C65.2224 70.1997 66.0897 69.9638 66.8673 69.492C67.6449 69.0202 68.2654 68.3885 68.729 67.5971C69.1925 66.7904 69.4243 65.9076 69.4243 64.9487C69.4243 63.9746 69.1925 63.0919 68.729 62.3004C68.2654 61.4937 67.6449 60.8545 66.8673 60.3826C66.0897 59.8956 65.2224 59.6521 64.2654 59.6521H59.1065V64.9487C59.1065 65.9076 59.3308 66.7904 59.7794 67.5971C60.243 68.3885 60.8636 69.0202 61.6411 69.492C62.4336 69.9638 63.3084 70.1997 64.2654 70.1997ZM45.514 54.9947H54.5308V45.8168H45.514V54.9947Z" fill="white"/>
// </svg>
// `;

//   const htmlContent = `
// <!DOCTYPE html>
// <html lang="en">
// <head>
// <meta charset="UTF-8">
// <title>SVG Center</title>
// <style>
//   body, html {
//     height: 100%;
//     margin: 0;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     background-color: transparent;
//   }
//   svg {
//     display: block; /* Removes extra space below SVG */
//   }
// </style>
// </head>
// <body>
//   ${svgContent}
// </body>
// </html>
// `;

//   // Load SVG content into the page
//   await page.setContent(svgContent);

//   await page.setContent(htmlContent, {
//     waitUntil: "networkidle0",
//   });

//   // Optional: Set the viewport if you want a specific window size
//   await page.setViewport({
//     width: 100,
//     height: 100,
//   });

//   // Take a screenshot of the SVG content
//   const buffer = await page.screenshot({
//     encoding: "binary",
//     omitBackground: true,
//   });

//   // Use Sharp to convert the screenshot (buffer) to PNG (if needed)
//   sharp(buffer)
//     .png()
//     .toFile("output.png", (err, info) => {
//       if (err) throw err;
//       console.log("SVG has been converted to PNG.");
//     });

//   await browser.close();
// })();
