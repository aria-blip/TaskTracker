import { diff } from "jsr:@std/internal@1.0.5/diff";
import puppeteer, { Page } from "npm:puppeteer";

export function add(a: number, b: number): number {
  return a + b;
}


const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setViewport({width: 1900, height: 1024});

await page.goto("https://knowunity.de/auth/signin");
console.log("done");



const element = await page.waitForSelector('::-p-xpath(//*[@id="email"])');
const element2 = await page.waitForSelector('::-p-xpath(//*[@id="password"])');

if(element && element2) {
  console.log("element found");
  await element.type("xxxx");
  await element2.type("xxxx");

  await page.screenshot({ path: "example3.png" });

  const loginbutt = await page.waitForSelector('::-p-xpath(//*[@id="__next"]/div/main/div/div[2]/div/div[3]/div[1]/form/div/button)');
  if(loginbutt) {
    console.log("login button found");
    await loginbutt.click();
    try {
      const loginbuttt = await page.waitForSelector('::-p-xpath(/html/body/div[2]/div/div/div/div/div[2]/div/div[2]/div)');
      if(loginbuttt) {
           console.log("element found");
      await page.screenshot({ path: "example43.png" });
      await getknows("szenen analyse").then((value) => {
        for (let i = 0; i < value.length; i++) {
          console.log(value[i][1]);
        }});      

      }


    
  
    }
    catch(e) {
      await page.screenshot({ path: "example433.png" });
    }

}

}



async function getknows(theurlsearch:string):Promise<string[]>{
  var finallist:string[]=[];
  theurlsearch=theurlsearch.replace(" ","+");
  const theurl="https://knowunity.de/app/search?query="+ theurlsearch +"+&subjectId=&utm_content=app_header"
  await page.goto(theurl);
  await page.screenshot({ path: "end.png" });
  const firstdiv = await page.waitForSelector('::-p-xpath(//*[@id="__next"]/div/main/div/div/main/div[1]/div/div[2]/div/div[2]/div/div[1]/div[2]/div[1])').then(async () => {
    var broken=false
    for (let i = 1; i < 250; i++) {
      try{  	                  
        var aa= await page.waitForSelector('::-p-xpath(//*[@id="__next"]/div/main/div/div/main/div[1]/div/div[2]/div/div[2]/div/div['+i+']/div[2]/div[1]/img)',{timeout: 1000});
        if (aa) {
          const imageSrc = await aa.evaluate(img => img.src); // Get the src attribute
          if(imageSrc.length<95){
          var updatedimg:string=imageSrc.match(/CONTENT\/([^_]+)/);
          finallist.push(updatedimg)
}


        } else {
          console.log("Selector 'aa' is null");
        }
        
      }catch(e){
        broken=true;
      }
      if(broken){
        break;
      }
    
  }});
  console.log("done");

  return finallist;

}
