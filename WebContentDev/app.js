
// 기술스택창
const $text = document.querySelector(".mySkills");
const skills = ["Photoshop","Illustrator", "Figma","Procreate","HTML","CSS", "JavaScript","Python","Java","C#","Unity", "Firebase"];
const speed = 200;
let i = 0;

const type = async () => {  
const skill = skills[i].split("");

while (skill.length) {
    await wait(speed);
    $text.innerHTML += skill.shift(); 
}
await wait(800);
remove();
}

//remove
const remove = async () => {
const skill = skills[i].split("");

while (skill.length) {
    await wait(speed);
    
    skill.pop();
    $text.innerHTML = skill.join(""); 
}

i = !skills[i+1]?0:i+1;
type();
}

function wait(ms) {
return new Promise(res => setTimeout(res, ms))
}
setTimeout(type, 1500);