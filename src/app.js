const $=s=>document.querySelector(s),root=$('#root');
const classes=Array.from({length:10},(_,i)=>`9H${String(i+1).padStart(2,'0')}`),groups=Array.from({length:6},(_,i)=>`Nhóm ${i+1}`);
const teachers={'9H01':'Thầy Hồ Đình Kha','9H02':'Thầy Hồ Đình Kha','9H03':'Thầy Huỳnh Quốc Thịnh','9H04':'Thầy Huỳnh Bảo Thiên','9H05':'Thầy Huỳnh Quốc Thịnh','9H06':'Thầy Huỳnh Bảo Thiên','9H07':'Thầy Huỳnh Quốc Thịnh','9H08':'Thầy Hồ Đình Kha','9H09':'Thầy Huỳnh Quốc Thịnh','9H10':'Thầy Huỳnh Bảo Thiên'};
const lessons=[
['▦','Sơ đồ khối và Arduino Uno','Phân tích Input → Process → Output; nhận biết Digital, Analog In, PWM (~); nối đúng GND, VCC và SIG.',['Nút nhấn','Arduino xử lý','LED'],['Arduino Uno','Grove Button','Grove LED'],[['Button','GND / VCC / SIG','GND / 5V / D2'],['LED','GND / VCC / SIG','GND / 5V / D8']],'Kiểm tra cấu trúc chương trình Arduino và làm LED chớp theo chu kỳ.',`const int LED=8;
void setup(){ pinMode(LED,OUTPUT); }
void loop(){
  digitalWrite(LED,HIGH); delay(500);
  digitalWrite(LED,LOW); delay(500);
}`,'Dựng mạch và làm LED chớp mỗi 0,5 giây. Đổi delay thành 1000 ms rồi so sánh.'],
['◉','Digital Input/Output và if…else','Dùng pinMode, digitalRead, digitalWrite và if…else để tạo chuông cửa.',['Button D2','Kiểm tra nút nhấn','LED D8 + Buzzer D7'],['Arduino Uno','Grove Button','Grove LED','Grove Buzzer'],[['Button','GND / VCC / SIG','GND / 5V / D2'],['LED','GND / VCC / SIG','GND / 5V / D8'],['Buzzer','GND / VCC / SIG','GND / 5V / D7']],'Khi có khách nhấn nút, Arduino bật đèn và chuông; khi thả nút thì tắt.',`const int BUTTON=2,LED=8,BUZZER=7;
void setup(){
  pinMode(BUTTON,INPUT); pinMode(LED,OUTPUT); pinMode(BUZZER,OUTPUT);
}
void loop(){
  if(digitalRead(BUTTON)==HIGH){
    digitalWrite(LED,HIGH); digitalWrite(BUZZER,HIGH);
  }else{ digitalWrite(LED,LOW); digitalWrite(BUZZER,LOW); }
}`,'Tạo chuông cửa; nâng cấp để chuông kêu 300 ms nhưng đèn giữ sáng 2 giây.'],
['☀','Analog Input, PWM và map()','Đọc ánh sáng bằng analogRead; đổi thang với map; điều khiển LED qua chân PWM (~).',['Light Sensor A0','map 0–1023 → 255–0','LED D9~'],['Arduino Uno','Grove Light Sensor','Grove LED'],[['Light Sensor','GND / VCC / SIG','GND / 5V / A0'],['LED','GND / VCC / SIG','GND / 5V / D9 (~)']],'Môi trường càng tối, đèn càng sáng bằng cách đổi giá trị Analog 10-bit sang PWM 8-bit.',`const int LIGHT=A0,LED=9;
void setup(){ pinMode(LED,OUTPUT); }
void loop(){
  int light=analogRead(LIGHT);
  int level=map(light,0,1023,255,0);
  analogWrite(LED,constrain(level,0,255)); delay(50);
}`,'Thay đổi ánh sáng và ghi lại ba cặp giá trị cảm biến–độ sáng LED.'],
['☂','Serial Monitor và cảm biến mưa','Dùng Serial.begin(9600), Serial.print/println, ngưỡng và if…else.',['Rain Sensor A1','So sánh ngưỡng 500','LED cảnh báo'],['Arduino Uno','Grove Water/Rain Sensor','Grove LED'],[['Rain Sensor','GND / VCC / SIG','GND / 5V / A1'],['LED','GND / VCC / SIG','GND / 5V / D8']],'Theo dõi độ ướt trên Serial Monitor và bật cảnh báo khi vượt ngưỡng.',`const int RAIN=A1,LED=8;
void setup(){ pinMode(LED,OUTPUT); Serial.begin(9600); }
void loop(){
  int rain=analogRead(RAIN);
  Serial.print("Rain: "); Serial.println(rain);
  if(rain>500) digitalWrite(LED,HIGH); else digitalWrite(LED,LOW);
  delay(500);
}`,'Mở Serial Monitor ở 9600 baud, tìm ngưỡng phù hợp và giải thích lựa chọn.'],
['↔','Khoảng cách và động cơ Servo','Hiểu đo siêu âm; khai báo thư viện và điều khiển Servo bằng attach(), write().',['Ultrasonic D4','Khoảng cách < 20 cm','Servo mở cửa'],['Arduino Uno','Grove Ultrasonic Ranger','Servo'],[['Ultrasonic','GND / VCC / SIG','GND / 5V / D4'],['Servo','GND / VCC / Signal','GND / 5V / D9']],'Khi có người đến gần, servo quay 90° mô phỏng mở cửa; khi người rời đi, cửa đóng.',`#include <Servo.h>
#include <Ultrasonic.h>
Ultrasonic sensor(4); Servo door;
void setup(){ door.attach(9); }
void loop(){
  long cm=sensor.MeasureInCentimeters();
  if(cm<20) door.write(90); else door.write(0);
  delay(200);
}`,'Thêm thư viện trong Library Manager. Thử 10, 20 và 40 cm; ghi góc servo.'],
['▤','Màn hình LCD và thư viện','Khai báo LCD I2C; dùng init(), backlight(), setCursor() và print().',['Light Sensor A0','Đọc và định dạng','LCD1602 I2C'],['Arduino Uno','Grove Light Sensor','LCD1602 I2C'],[['Light Sensor','GND / VCC / SIG','GND / 5V / A0'],['LCD','GND / VCC','GND / 5V'],['LCD','SDA / SCL','A4 / A5']],'Hiển thị liên tục giá trị ánh sáng và trạng thái SÁNG/TỐI trên LCD.',`#include <Wire.h>
#include <LiquidCrystal_I2C.h>
LiquidCrystal_I2C lcd(0x27,16,2);
void setup(){ lcd.init(); lcd.backlight(); }
void loop(){
  int v=analogRead(A0);
  lcd.setCursor(0,0); lcd.print("Light: "); lcd.print(v); lcd.print("   ");
  lcd.setCursor(0,1); lcd.print(v<500?"TROI TOI ":"TROI SANG"); delay(300);
}`,'Hiển thị số đo và trạng thái trên hai dòng. Nếu LCD trống, kiểm tra 0x27 và dây I2C.'],
['⌂','Dự án Smart Home tổng hợp','Kết hợp sơ đồ khối, cảm biến, cơ cấu chấp hành, Serial, LCD và Servo.',['Ánh sáng + mưa + khoảng cách','Arduino phân tích điều kiện','Đèn + còi + cửa + LCD'],['Arduino Uno','Light','Rain','Ultrasonic','LED','Buzzer','Servo','LCD I2C'],[['Light / Rain','SIG','A0 / A1'],['Ultrasonic','SIG','D4'],['LED / Buzzer','SIG','D6~ / D7'],['Servo','Signal','D9'],['LCD','SDA / SCL','A4 / A5'],['Tất cả thiết bị','GND / VCC','GND / 5V']],'Vận hành nhà thông minh: bật đèn khi tối, báo mưa, mở cửa khi có người và hiển thị trạng thái.',`#include <Servo.h>
// Thêm thư viện LCD và Ultrasonic như Bài 5–6
const int LIGHT=A0,RAIN=A1,LED=6,BUZZER=7; Servo door;
void setup(){
  pinMode(LED,OUTPUT); pinMode(BUZZER,OUTPUT);
  door.attach(9); Serial.begin(9600);
  // Khởi tạo LCD và cảm biến khoảng cách
}
void loop(){
  int light=analogRead(LIGHT),rain=analogRead(RAIN);
  analogWrite(LED,map(light,0,1023,255,0));
  digitalWrite(BUZZER,rain>500?HIGH:LOW);
  // Đọc khoảng cách, điều khiển cửa, cập nhật LCD
  Serial.println(light); delay(200);
}`,'Hoàn thiện các dòng chú thích, vẽ sơ đồ khối và kiểm thử ít nhất bốn tình huống.']
];
const quiz=[['GND của thiết bị nối vào đâu?',['GND','5V','A0'],0],['VCC nối cổng nào?',['5V','GND','D0'],0],['setup() chạy thế nào?',['Một lần khi khởi động','Liên tục','Không chạy'],0],['loop() có vai trò gì?',['Lặp liên tục','Khai báo thư viện','Tắt nguồn'],0],['Dấu ~ cạnh chân Digital cho biết gì?',['Hỗ trợ PWM','Chân GND','Analog In'],0],['Chân Analog In ký hiệu thế nào?',['A0–A5','D0–D13','TX/RX'],0]];
let state=JSON.parse(localStorage.getItem('ash-velxio-v1')||'{}');state.profile=state.profile||{};state.done=state.done||{};state.score=state.score||{};const save=()=>localStorage.setItem('ash-velxio-v1',JSON.stringify(state));
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function shell(body){root.innerHTML=`<div class="app"><header><button class="brand" onclick="home()"><span class="brandmark">∞</span><span>ARDUINO<br><b>VELXIO LAB</b></span></button><nav><button onclick="roadmap()">Các bài học</button><button onclick="guide()">Hướng dẫn Velxio</button><button onclick="progressPage()">Tiến độ</button></nav></header><main>${body}</main><footer><span>Arduino Smart Home · Khối 9</span><span>100% mô phỏng trên Velxio</span></footer></div>`;scrollTo(0,0)}
function home(){let n=Object.keys(state.done).length;shell(`<section class="hero"><div class="heroCopy"><div class="eyebrow">KHỐI 9 · 7 BÀI · 100% MÔ PHỎNG</div><h1>Arduino Smart Home<br><em>trên Velxio</em></h1><p>Học từ sơ đồ khối, nối module Grove, lập trình Arduino C++ đến dự án nhà thông minh — không cần thiết bị thật.</p><div class="heroButtons"><button class="primary" onclick="roadmap()">${n?'Tiếp tục học':'Bắt đầu học'} →</button><a class="textButton" href="https://velxio.dev/editor/" target="_blank">Mở Velxio ↗</a></div></div><div class="wokwiHero"><div class="virtualBoard"><b>ARDUINO UNO</b><i></i><span>GND</span><span>5V</span><span>SIG</span></div><div class="virtualCode"><small>Input → Process → Output</small><code>Grove + Arduino C++</code><strong>RUN ✓</strong></div></div></section><section class="journey"><div class="sectionTitle"><div><span class="kicker">LỘ TRÌNH</span><h2>7 bài từ cơ bản đến dự án</h2></div><div class="bigProgress"><b>${n}/7</b><span>bài hoàn thành</span></div></div><div class="lessonGrid">${lessons.map((l,i)=>card(l,i)).join('')}</div></section>`)}
const card=(l,i)=>`<button class="lessonCard" onclick="lesson(${i})"><span class="lessonNo">${String(i+1).padStart(2,'0')}</span><span class="lessonIcon">${l[0]}</span><h3>${l[1]}</h3><p>${l[2]}</p>${state.done[i]?'<b>✓ Đã hoàn thành</b>':''}</button>`;
function roadmap(){shell(`<section class="page"><div class="pageHead"><span class="kicker">CHƯƠNG TRÌNH</span><h1>7 bài Arduino trên Velxio</h1><p>Mỗi bài có lý thuyết, sơ đồ khối, bảng nối dây, mã mẫu, nhiệm vụ và chứng nhận riêng.</p></div><div class="lessonGrid">${lessons.map((l,i)=>card(l,i)).join('')}</div></section>`)}
function lesson(i){let l=lessons[i];shell(`<section class="lessonHero"><div><button class="back" onclick="roadmap()">← Các bài học</button><span class="kicker">BÀI ${i+1}</span><h1>${l[1]}</h1><p>${l[2]}</p></div><div class="giantIcon">${l[0]}</div></section><div class="lessonLayout"><aside><b>TRONG BÀI NÀY</b><a href="#block">Sơ đồ khối</a><a href="#wire">Nối mạch</a><a href="#code">Lập trình</a><a href="#quiz">Trắc nghiệm</a><a href="#submit">Nộp bài</a></aside><div class="lessonContent"><section id="block" class="story"><h2>Sơ đồ khối</h2><div class="blockflow">${l[3].map((x,n)=>`${n?'<span>→</span>':''}<div><b>${['INPUT','PROCESS','OUTPUT'][n]}</b><small>${x}</small></div>`).join('')}</div><div class="safetyNote"><b>Quy tắc bắt buộc:</b> GND → GND, VCC → 5V, SIG → đúng chân. A0–A5 là Analog In; chân Digital có dấu ~ hỗ trợ PWM.</div></section><section id="wire"><span class="kicker">THỰC HÀNH VELXIO</span><h2>Bảng nối mạch</h2><p><b>Thiết bị:</b> ${l[4].join(' · ')}</p><div class="tableWrap"><table><thead><tr><th>Thiết bị</th><th>Chân thiết bị</th><th>Arduino Uno</th></tr></thead><tbody>${l[5].map(r=>`<tr>${r.map(x=>`<td>${x}</td>`).join('')}</tr>`).join('')}</tbody></table></div><a class="primary" href="https://velxio.dev/editor/" target="_blank">Mở Velxio Editor ↗</a></section><section id="code" class="codingWorkshop"><span class="kicker">LẬP TRÌNH</span><h2>Chương trình mẫu</h2><div class="codePurpose"><b>Mục đích của toàn bộ code</b><p>${l[6]}</p></div><pre><code>${esc(l[7])}</code></pre><h3>Yêu cầu thực hành</h3><p>${l[8]}</p></section><section id="quiz"><h2>Trắc nghiệm</h2><form class="quizList" onsubmit="grade(event,${i})">${quiz.map((q,n)=>`<fieldset><legend><span>${n+1}</span>${q[0]}</legend>${q[1].map((a,k)=>`<label><input required type="radio" name="q${n}" value="${k}">${a}</label>`).join('')}</fieldset>`).join('')}<button class="primary">Chấm điểm</button><b id="score">${state.score[i]!=null?' Kết quả cao nhất: '+state.score[i]+'%':''}</b></form></section><section id="submit" class="completion"><div><h2>Nộp bài và nhận chứng nhận</h2><p>Đạt ít nhất 70%, nhập thông tin và dán liên kết dự án Velxio.</p>${submitForm(i)}</div></section></div></div>`)}
function submitForm(i){let p=state.profile;return `<div class="profileFields"><label>Họ và tên<input id="studentName" value="${esc(p.name||'')}"></label><label>Lớp<select id="className">${classes.map(x=>`<option ${p.className===x?'selected':''}>${x}</option>`).join('')}</select></label><label>Nhóm<select id="groupName">${groups.map(x=>`<option ${p.group===x?'selected':''}>${x}</option>`).join('')}</select></label></div><label class="wokwiSubmit">Liên kết dự án Velxio<input id="projectUrl" placeholder="https://velxio.dev/…" value="${esc(state.done[i]?.url||'')}"></label><button class="primary" onclick="complete(${i})">Xác nhận hoàn thành</button> ${state.done[i]?`<button class="outline" onclick="certificate(${i})">Chứng nhận Bài ${i+1}</button>`:''}<b id="submitStatus"></b>`}
function grade(e,i){e.preventDefault();let f=new FormData(e.target),n=0;quiz.forEach((q,k)=>{if(+f.get('q'+k)===q[2])n++});let score=Math.round(n/quiz.length*100);state.score[i]=Math.max(state.score[i]||0,score);save();$('#score').textContent=` Kết quả: ${score}%`}
function complete(i){let name=$('#studentName').value.trim(),className=$('#className').value,group=$('#groupName').value,url=$('#projectUrl').value.trim(),s=$('#submitStatus');if(!name)return s.textContent=' Hãy nhập họ tên.';if((state.score[i]||0)<70)return s.textContent=' Cần đạt ít nhất 70%.';if(!/^https:\/\/(www\.)?velxio\.dev\//i.test(url))return s.textContent=' Liên kết phải thuộc velxio.dev.';state.profile={name,className,group};state.done[i]={url,date:new Date().toLocaleDateString('vi-VN')};save();lesson(i)}
function certificate(i){let p=state.profile,d=state.done[i];document.body.insertAdjacentHTML('beforeend',`<div class="certModal"><section class="certificate lessonCertificate"><button class="closeCert noPrint" onclick="this.closest('.certModal').remove()">×</button><span class="certSeal">∞</span><small>ARDUINO SMART HOME · VELXIO · KHỐI 9</small><h2>CHỨNG NHẬN HOÀN THÀNH BÀI ${i+1}</h2><p>Chứng nhận</p><h3>${esc(p.name)}</h3><p>Lớp <b>${p.className}</b> · <b>${p.group}</b></p><p>đã hoàn thành <b>${lessons[i][1]}</b><br>với điểm trắc nghiệm <b>${state.score[i]}%</b></p><div class="certBottom"><span>${d.date}<small>Ngày hoàn thành</small></span><span>VXL-B${i+1}-${p.className}<small>Mã chứng nhận</small></span><span><b>${teachers[p.className]}</b><small>Giáo viên phụ trách</small></span></div><button class="primary noPrint" onclick="print()">In / Lưu PDF</button></section></div>`)}
function progressPage(){let n=Object.keys(state.done).length;shell(`<section class="page"><div class="pageHead"><span class="kicker">TIẾN ĐỘ</span><h1>${n}/7 bài đã hoàn thành</h1><p>${state.profile.name||'Học sinh khối 9'} ${state.profile.className?'· '+state.profile.className+' · '+state.profile.group:''}</p></div><div class="tableWrap"><table><thead><tr><th>Bài</th><th>Điểm</th><th>Trạng thái</th><th>Chứng nhận</th></tr></thead><tbody>${lessons.map((l,i)=>`<tr><td><b>Bài ${i+1}. ${l[1]}</b></td><td>${state.score[i]||0}%</td><td>${state.done[i]?'Hoàn thành':'Chưa hoàn thành'}</td><td>${state.done[i]?`<button class="outline" onclick="certificate(${i})">In PDF</button>`:'—'}</td></tr>`).join('')}</tbody></table></div></section>`)}
function guide(){shell(`<section class="page"><div class="pageHead"><span class="kicker">VELXIO</span><h1>Quy trình mô phỏng</h1></div><div class="guideGrid">${[['01','Tạo dự án','Mở Velxio Editor và chọn Arduino Uno.'],['02','Thêm thiết bị','Tìm module Grove theo danh sách bài học.'],['03','Nối mạch','Nối GND, VCC rồi SIG theo bảng.'],['04','Lập trình','Nhập mã và thêm thư viện khi cần.'],['05','Kiểm thử','Biên dịch, chạy, đổi dữ liệu cảm biến và quan sát.'],['06','Nộp bài','Lưu/chia sẻ dự án và dán liên kết.']].map(x=>`<article><b>${x[0]}</b><h2>${x[1]}</h2><p>${x[2]}</p></article>`).join('')}</div><section class="wokwiNotes"><b>Khi có lỗi:</b> kiểm tra nguồn → chân tín hiệu → tên chân trong code → thư viện → thông báo biên dịch.</section><p><a class="primary" href="https://velxio.dev/editor/" target="_blank">Mở Velxio Editor ↗</a> <a class="outline" href="https://velxio.dev/docs/getting-started/welcome/" target="_blank">Tài liệu Velxio ↗</a></p></section>`)}
Object.assign(window,{home,roadmap,lesson,grade,complete,certificate,progressPage,guide});home();
