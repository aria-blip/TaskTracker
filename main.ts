import { diff } from "jsr:@std/internal@1.0.5/diff";

export function add(a: number, b: number): number {
  return a + b;
}

class Task{
  task_text:string;
  done:boolean=false;
  progress:boolean=false;
  constructor(_task_text:string){
    this.task_text=_task_text
  }
}

async function startTaskManger(input:string[]){
  try{
    await Deno.readTextFile("./task.json");
  
    }catch{
      await await Deno.create("./task.json");
  }

  console.log(" STARTING TASK MANAGER \n")
  console.log(" add after file first the option so ... maint.ts option  option=delete,print,edit,add \n")
  console.log(" for print ... maint.ts print 1 or 2 or 3 or 4 \n")
  console.log(" for edit  ... maint.ts edit  positon progress if 1 then true , done if true then true , task text \n")
  console.log(" for add  ... maint.ts add   task text \n")


  const readJson = await Deno.readTextFile("./task.json");
  var readjsonobject: Task[]=JSON.parse(readJson) 

  var tasks:Task[ ] = readjsonobject
  if(input[0]== "print"){
    printCurrentTask(parseInt( input[1]))
  }
  else if(input[0]=="delete"){
    tasks= tasks.slice(parseInt(input[1]));
    await Deno.writeTextFile("./task.json", JSON.stringify(tasks)  );
    console.log("deleted")

  }
  else   if(input[0]=="edit"){
    
    tasks[parseInt(input[1])].progress =  parseInt(input[2]) === 1 ? true : false;
    tasks[parseInt(input[1])].done =  parseInt(input[3]) === 1 ? true : false;
    tasks[parseInt(input[1])].task_text =  parseInt(input[3]) === undefined ?tasks[parseInt(input[1])].task_text   :  (input[3]);

    await Deno.writeTextFile("./task.json", JSON.stringify(tasks)  );
    console.log("editet")

  }

  else   if(input[0]=="add"){
    
    tasks.push(new Task(input[1]))
    await Deno.writeTextFile("./task.json", JSON.stringify(tasks)  );
    console.log("added")

  }




}
async function printCurrentTask(option:number) {
  const readJson = await Deno.readTextFile("./task.json");
  var readjsonobject: Task[]=JSON.parse(readJson) 

  switch(option){
    // print all tasks
    case 1:
      for( var a of readjsonobject){
        console.log("Task : "+a.task_text +" COMPLETE :"+a.done + " PROGRESS: "+ a.progress)
      }
      break
    // print all completed tasks
    case 2:
      for( var a of readjsonobject){
        if(a.done==true){
        console.log("Task : "+a.task_text +" COMPLETE :"+a.done)
        }
      }
      break
    // print all not completed tasks
    case 3:
      for( var a of readjsonobject){
        if(a.done==false){
        console.log("Task : "+a.task_text +" COMPLETE :"+a.done +" PROGRESS : " + a.progress)
        }
      }
      break 
      // print all in progress
      case 4:
        for( var a of readjsonobject){
          if(a.progress==true){
          console.log("Task : "+a.task_text +" PROGRESS :"+a.progress)
          }
        }
        break 
      default :
        console.log("make sure you enter the correct number \n ")
    
}

}

startTaskManger(Deno.args)