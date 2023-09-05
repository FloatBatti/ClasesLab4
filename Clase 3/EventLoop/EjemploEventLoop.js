
console.log("⏳Task 1");

setTimeout(()=>{console.log("📝 Task 2")}, 0);

Promise.resolve().then(()=>{
    console.log("🐜 MicroTask 1");
})

console.log("⏳Task 3");

Promise.resolve().then(()=>{
    console.log("🐜 MicroTask 2");
})