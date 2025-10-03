import { getContext, FPS } from "./utils-module.js";

// กำหนดชื่อเรื่องของเอกสาร HTML
document.title = "A01 - App Graphics 2D";
// กำหนดให้ฟังก์ชัน main ทำงานเมื่อ DOM ถูกโหลดเสร็จสมบูรณ์
document.addEventListener("DOMContentLoaded", main);

// ฟังก์ชันหลักที่ใช้ในการเริ่มต้นแอปพลิเคชัน ทำงานเมื่อ DOM ถูกโหลดเสร็จสมบูรณ์
function main(ev) {
	// เข้าถึง context ของ canvas ที่มี id เป็น "myCanvas"
	const ctx = getContext("#myCanvas");

	// กำหนดค่าเริ่มต้นสำหรับแอปพลิเคชันในรูปแบบของอ็อบเจกต์ config
	const config = {
		width : 800,
		height : 600,
		bgColor : "white",
		debug : true,
	};

	// กำหนดขนาดของ canvas ตามค่า config
	ctx.canvas.width = config.width;
	ctx.canvas.height = config.height;

	function draw() {
		// ใช้ FPS สำหรับการวัดอัตราเฟรมต่อวินาที
		FPS.update();

		// กำหนดสีพื้นหลังของ canvas และใช้ fillRect เพื่อเติมสีพื้นหลัง
		ctx.fillStyle = config.bgColor;
		ctx.fillRect(0, 0, config.width, config.height);

		// วาดรูปจากส่วนนี้ไป **แนะนำให้วาดจากรูปที่อยู่ด้านหลังไปด้านหน้าตามลำดับ**
		// ใช้ภาพจาก MP1-app-graphics-2d.jpg เป็นแนวทางในการวาดรูป แต่จะวาดอย่างไรก็ได้ตามต้องการ

		// พื้นหลังท้องฟ้า
	ctx.fillStyle = "skyblue";
	ctx.fillRect(0, 0, 800, 300);

	
	
	// วาดภูเขา
	ctx.beginPath(); // เริ่มเส้นทางใหม่
	ctx.moveTo(100, 400); // จุดเริ่มต้นของ curve
	ctx.quadraticCurveTo(600, -100, 900, 300); // วาด curve แบบ quadratic
	ctx.strokeStyle = "#004e0d"; // กำหนดสีเส้น
	ctx.lineWidth = 4; // กำหนดความหนาของเส้น
	ctx.fillStyle = "#16c550"; // สี
	ctx.fill();
	ctx.stroke(); // วาดเส้น curve

	ctx.beginPath(); // เริ่มเส้นทางใหม่
	ctx.moveTo(-100, 300); // จุดเริ่มต้นของ curve
	ctx.quadraticCurveTo(150, -100, 500, 450); // วาด curve แบบ quadratic
	ctx.strokeStyle = "#004e0d"; // กำหนดสีเส้น
	ctx.lineWidth = 4; // กำหนดความหนาของเส้น
	ctx.fillStyle = "#16c550"; // สี
	ctx.fill();
	ctx.stroke(); // วาดเส้น curve
	
	// พระอาทิตย์
	ctx.beginPath();
	ctx.arc(330, 100, 50, 0, Math.PI * 2, true);
	ctx.fillStyle = "#dceb11ff";
	ctx.fill();
	

	//ขอบรัศมีหมุน
	ctx.strokeStyle = "#ff6200ff";
	for (let i = 0; i < 16; i++) {
		let angle = (i * Math.PI) / 8 + Date.now() * 0.002; // เพิ่มการหมุนด้วยเวลา
		let x1 = 330 + Math.cos(angle) * 60;
		let y1 = 100 + Math.sin(angle) * 60;
		let x2 = 330 + Math.cos(angle) * 80;
		let y2 = 100 + Math.sin(angle) * 80;
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.stroke();
	}	


	//ก้อนเมฆ
	function drawCloud(x, y) {
		ctx.beginPath();
		ctx.arc(x, y, 20, 0, Math.PI * 2);
		ctx.arc(x + 25, y - 10, 20, 0, Math.PI * 2);
		ctx.arc(x + 50, y, 20, 0, Math.PI * 2);
		ctx.fillStyle = "white";
		ctx.fill();
	}
	

	//ก้อนเมฆเคลื่อนที่
	let time = Date.now() * 0.25; // ใช้เวลาในการเคลื่อนที่
	let cloudX = (time % (config.width + 800)) - 800; // คำนวณตำแหน่ง x ของเมฆ
	ctx.save(); // บันทึกสถานะปัจจุบันของ context
	ctx.translate(cloudX, 0); // เลื่อนตำแหน่งเมฆ
	drawCloud(500, 100); // วาดเมฆที่ตำแหน่งใหม่
	drawCloud(700, 80);
	drawCloud(50, 120);
	drawCloud(150, 90); // วาดเมฆที่ตำแหน่งใหม่
	ctx.restore(); // คืนค่ากลับไปยังสถานะก่อนหน้า


	// วาดนกแบบตัว V
	function drawBird(x, y) {
		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.lineTo(x + 10, y - 5);
		ctx.lineTo(x + 20, y);
		ctx.strokeStyle = "black";
		ctx.stroke();
	}
	drawBird(100, 80);
	drawBird(200, 60);
	drawBird(450, 90);

	// พื้นดินล่าง
	ctx.fillStyle = "#246930ff";
	ctx.fillRect(0, 300, 800, 300);

	//สร้างแปลงผักมีสีผักกับผักเล็กน้อย
	function drawVegetablePlot(x, y) {
		ctx.fillStyle = "sienna";
		ctx.fillRect(x, y, 100, 50); // แปลงผัก

		// วาดผัก
		ctx.fillStyle = "green";
		for (let i = 0; i < 5; i++) {
			ctx.fillRect(x + 10 + i * 18, y + 10, 10, 30); // ผัก
		}
	}
	drawVegetablePlot(10, 350);
	drawVegetablePlot(150, 350);
	drawVegetablePlot(10, 430);
	drawVegetablePlot(150, 430);

	// แม่น้ำ
	ctx.beginPath();
	ctx.moveTo(300, 300);
	ctx.bezierCurveTo(350, 400, 250, 500, 400, 600);
	ctx.lineTo(600, 600);
	ctx.bezierCurveTo(350, 400, 450, 300, 300, 300);
	ctx.closePath();
	ctx.fillStyle = "lightblue";
	ctx.fill();

	// บ้าน
	ctx.fillStyle = "#ff0000";
	ctx.fillRect(600, 400, 80, 80); // ตัวบ้าน
	ctx.fillStyle = "#0000ff";
	ctx.beginPath();
	ctx.moveTo(590, 400);
	ctx.lineTo(640, 350);
	ctx.lineTo(690, 400);
	ctx.closePath();
	ctx.fill();
	
	// ประตูบ้าน
	ctx.fillStyle = "black";
	ctx.fillRect(630, 440, 20, 40);

	// ต้นไม้ที่ใบเป็ฯวัตถุวงกลม3วง
	function drawTree(x, y) {
		// ลำต้น
		ctx.fillStyle = "sienna";
		ctx.fillRect(x, y, 20, 60);
		// ใบไม้
		ctx.beginPath();
		ctx.arc(x + 10, y - 10, 30, 0, Math.PI * 2);
		ctx.arc(x + 35, y + 10, 30, 0, Math.PI * 2);
		ctx.arc(x - 15, y + 10, 30, 0, Math.PI * 2);
		ctx.fillStyle = "green";
		ctx.fill();
	}
		drawTree(750, 350);
		drawTree(250, 500);
		drawTree(600, 300);
		drawTree(540, 340);

		// วาดรูปจนจบที่นี่
		// แสดงข้อความ FPS บน canvas ถ้า config.debug เป็น true
		if (config.debug) FPS.show(ctx, 10, 28);

		// ใช้ requestAnimationFrame เพื่อเรียกใช้ฟังก์ชัน draw ต่อไป
		requestAnimationFrame(draw);
	}
	// เริ่มต้นการวาดภาพบน canvas
	draw();
}