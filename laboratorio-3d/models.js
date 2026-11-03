// Original procedural educational models. Dimensions and layouts are approximate.
function makeKit(T){
  const mats=new Map();
  const mat=(color,metal=.0,rough=.55)=>{const key=color+'|'+metal+'|'+rough;if(!mats.has(key))mats.set(key,new T.MeshStandardMaterial({color,metalness:metal,roughness:rough}));return mats.get(key);};
  const mesh=(g,geo,m,x=0,y=0,z=0)=>{const o=new T.Mesh(geo,typeof m==='string'?mat(m):m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;g.add(o);return o;};
  const box=(g,w,h,d,c,x=0,y=0,z=0)=>mesh(g,new T.BoxGeometry(w,h,d),c,x,y,z);
  const cyl=(g,r,h,c,x=0,y=0,z=0,n=32)=>mesh(g,new T.CylinderGeometry(r,r,h,n),c,x,y,z);
  function outline(w,d,r){const s=new T.Shape(),x=-w/2,z=-d/2;s.moveTo(x+r,z);s.lineTo(x+w-r,z);s.quadraticCurveTo(x+w,z,x+w,z+r);s.lineTo(x+w,z+d-r);s.quadraticCurveTo(x+w,z+d,x+w-r,z+d);s.lineTo(x+r,z+d);s.quadraticCurveTo(x,z+d,x,z+d-r);s.lineTo(x,z+r);s.quadraticCurveTo(x,z,x+r,z);return s;}
  function slab(g,w,d,h,r,c,x=0,y=0,z=0,holes=[]){const s=outline(w,d,r);for(const q of holes){const p=new T.Path();p.absarc(q[0],q[1],q[2],0,Math.PI*2,true);s.holes.push(p);}const geo=new T.ExtrudeGeometry(s,{depth:h,steps:1,bevelEnabled:true,bevelSize:Math.min(.025,h/5),bevelThickness:Math.min(.02,h/5),bevelSegments:2,curveSegments:8});geo.rotateX(-Math.PI/2);geo.translate(0,-h/2,0);return mesh(g,geo,c,x,y,z);}
  function frame(g,w,d,h,b,c,x=0,y=0,z=0){const s=outline(w,d,.25),hole=outline(w-2*b,d-2*b,.18);s.holes.push(new T.Path(hole.getPoints()));const geo=new T.ExtrudeGeometry(s,{depth:h,bevelEnabled:true,bevelSize:.035,bevelThickness:.025,bevelSegments:2,curveSegments:8});geo.rotateX(-Math.PI/2);geo.translate(0,-h/2,0);return mesh(g,geo,c,x,y,z);}
  function instance(g,geo,c,points){const o=new T.InstancedMesh(geo,typeof c==='string'?mat(c):c,points.length),m=new T.Matrix4();points.forEach((p,i)=>{m.makeTranslation(p[0],p[1],p[2]);o.setMatrixAt(i,m);});o.castShadow=true;o.receiveShadow=true;g.add(o);return o;}
  function ring(g,r,c,x,y,z,th=.025){const a=mesh(g,new T.TorusGeometry(r,th,8,24),typeof c==='string'?mat(c,.7,.3):c,x,y,z);a.rotation.x=-Math.PI/2;return a;}
  function screw(g,x,y,z,r=.12){cyl(g,r,.065,mat('#bdc7cf',.83,.24),x,y,z,20);box(g,r*1.3,.018,r*.24,'#313a43',x,y+.04,z);box(g,r*.24,.018,r*1.3,'#313a43',x,y+.04,z);}
  function standoff(g,x,y,z,h=.55){cyl(g,.13,h,mat('#c9a64b',.8,.35),x,y,z,6);screw(g,x,y+h/2+.035,z,.105);}
  function label(g,text,w,d,x,y,z,{bg='transparent',fg='#f3f4ec',size=38,rot=0,metal=false}={}){const c=document.createElement('canvas');c.width=1024;c.height=Math.max(96,Math.round(1024*d/w));const a=c.getContext('2d');if(bg!=='transparent'){a.fillStyle=bg;a.fillRect(0,0,c.width,c.height);}a.fillStyle=fg;a.textAlign='center';a.textBaseline='middle';const lines=String(text).split('\n');a.font=`600 ${Math.min(size,c.height/(lines.length+0.8))}px monospace`;lines.forEach((t,i)=>a.fillText(t,512,c.height/2+(i-(lines.length-1)/2)*c.height/(lines.length+1)));const tex=new T.CanvasTexture(c);tex.colorSpace=T.SRGBColorSpace;tex.anisotropy=4;const m=new T.MeshStandardMaterial({map:tex,transparent:bg==='transparent',roughness:.65,metalness:metal?.25:0,side:T.DoubleSide,depthWrite:bg!=='transparent'});const o=mesh(g,new T.PlaneGeometry(w,d),m,x,y,z);o.rotation.x=-Math.PI/2;o.rotation.z=rot;return o;}
  function trace(g,points,color='#2e725b'){const geo=new T.BufferGeometry().setFromPoints(points.map(p=>new T.Vector3(...p)));const o=new T.Line(geo,new T.LineBasicMaterial({color}));g.add(o);return o;}
  function cable(g,points,c='#272c35',r=.08){const curve=new T.CatmullRomCurve3(points.map(p=>new T.Vector3(...p)));return mesh(g,new T.TubeGeometry(curve,36,r,8,false),mat(c,.05,.65));}
  function chip(g,w,d,x,z,txt='IC',h=.13,y=.15){slab(g,w,d,h,.035,'#20262d',x,y+h/2,z);const pts=[];for(let i=0;i<6;i++){pts.push([x-w/2-.04,y+.02,z-d*.38+i*d*.152],[x+w/2+.04,y+.02,z-d*.38+i*d*.152]);}instance(g,new T.BoxGeometry(.13,.055,.055),mat('#b9c1c3',.75,.3),pts);label(g,txt,w*.86,d*.7,x,y+h+.006,z,{size:40,fg:'#a5acaa'});}
  function pcb(g,w,d,c='#15453d',hole=true){const holes=hole?[[-w/2+.2,-d/2+.2,.095],[w/2-.2,-d/2+.2,.095],[-w/2+.2,d/2-.2,.095],[w/2-.2,d/2-.2,.095]]:[];slab(g,w,d,.13,.16,mat(c,.15,.62),0,0,0,holes);holes.forEach(p=>ring(g,p[2]+.025,'#bf9c3f',p[0],.076,-p[1],.018));return g;}
  function headers(g,x,z,n,{dz=.254,y=.15,vertical=true}={}){const pts=[],pads=[];for(let i=0;i<n;i++){pts.push([x,y+.11,z+i*dz]);pads.push([x,.08,z+i*dz]);}box(g,.23,.18,n*dz+.02,'#161b23',x,y,z+(n-1)*dz/2);instance(g,new T.BoxGeometry(.06,.48,.06),mat('#c9ab53',.8,.32),pts);const ringGeo=new T.TorusGeometry(.075,.016,6,12);ringGeo.rotateX(-Math.PI/2);instance(g,ringGeo,mat('#d5b564',.75,.3),pads);}
  function smd(g,x0,z0,n=12){const caps=[],ends=[];for(let i=0;i<n;i++){const x=x0+(i%4)*.21,z=z0+Math.floor(i/4)*.23;caps.push([x,.13,z]);ends.push([x-.065,.13,z],[x+.065,.13,z]);}instance(g,new T.BoxGeometry(.105,.07,.065),'#b49c72',caps);instance(g,new T.BoxGeometry(.035,.075,.07),mat('#a9afb3',.65,.3),ends);}
  function usb(g,x,y,z,type='C'){const w=type==='C'?.9:.8;slab(g,w,.7,.32,.1,mat('#c3cbd0',.85,.25),x,y,z);box(g,w*.8,.18,.035,'#1b2026',x,y,z-.365);box(g,w*.6,.045,.04,'#55606c',x,y,z-.39);for(let i=0;i<5;i++)box(g,.035,.025,.055,mat('#d9b15a',.7,.3),x-w*.2+i*w*.1,y,z-.41);}
  function led(g,x,z,color='#8ee294'){cyl(g,.055,.055,new T.MeshStandardMaterial({color,emissive:color,emissiveIntensity:.8,roughness:.3}),x,.16,z,12);}
  function bme(){const g=new T.Group();pcb(g,2.52,1.8,'#136a83');slab(g,.34,.34,.10,.04,mat('#d1ced1',.85,.28),0,.15,0);cyl(g,.025,.01,'#1f2832',0,.21,0,10);chip(g,.25,.30,-.65,-.08,'U2',.08,.08);smd(g,.35,-.2,4);headers(g,0,-.65,1);for(let i=0;i<6;i++){cyl(g,.07,.02,mat('#d1b055',.75,.3),-.65+i*.254,.09,.65,12);cyl(g,.032,.025,'#152735',-.65+i*.254,.105,.65,12);}for(const x of [-1.08,1.08]){box(g,.30,.25,.47,'#eeeade',x,.19,0);box(g,.035,.12,.30,'#34343a',x+Math.sign(x)*.17,.18,0);}label(g,'BME280',1.25,.22,0,.085,-.52,{size:46});label(g,'VIN 3V GND SCK SDO SDI',1.9,.20,0,.085,.40,{size:32});for(let i=0;i<4;i++)trace(g,[[-.70+i*.36,.079,.6],[-.7+i*.36,.079,.35],[-.25+i*.13,.079,.10]]);return g;}
  return {mat,mesh,box,cyl,slab,frame,instance,ring,screw,standoff,label,trace,cable,chip,pcb,headers,smd,usb,led,bme};
}

export function buildProject(THREE,palette={}){
 const T=THREE,K=makeKit(T),P=[],C=[];
 const {mat,mesh,box,cyl,slab,frame,instance,ring,screw,standoff,label,trace,cable,chip,pcb,headers,smd,usb,led,bme}=K;
 const violet='#40204f',deep='#28183a',lime='#d7fa68',pink='#ef99c4',aluminum=mat('#a4b2bc',.72,.35);
 const part=(id,name,group,pos,explode,description,model,dimensions,category)=>{group.position.set(...pos);P.push({id,name,group,explode,description,model,dimensions,category});return group;};
 const shell=new T.Group();slab(shell,24,17,.7,.9,mat(violet,.1,.6),0,0,0);
 // Cutaway front and a low lip reveal the acquisition chain; other walls remain solid.
 slab(shell,24,1.0,4.6,.38,mat(violet,.1,.6),0,2.3,-8.0);
 slab(shell,.9,15.8,4.6,.3,mat(violet,.1,.6),-11.55,2.3,0);
 slab(shell,.9,15.8,4.6,.3,mat(violet,.1,.6),11.55,2.3,0);
 slab(shell,22.8,.8,1.25,.25,mat(violet,.1,.6),0,.62,8.0);
 for(const x of [-11.3,11.3])for(const z of [-7.7,7.7]){slab(shell,1.6,1.7,1.6,.4,'#191e2c',x,.2,z);screw(shell,x,1.04,z,.2);cyl(shell,.55,.55,'#252333',x,-.55,z);}
 for(let i=0;i<10;i++)box(shell,.12,2.4,.06,'#1b1726',-8.6+i*.4,2.3,-8.54);
 const handle=new T.Group();cable(handle,[[-4,0,0],[-4,0,1.6],[-3.2,0,2.4],[3.2,0,2.4],[4,0,1.6],[4,0,0]],deep,.32);box(handle,5.8,.62,.72,'#1c202a',0,0,2.35);handle.position.set(0,1.4,8.0);shell.add(handle);
 for(const x of [-7.4,7.4]){box(shell,1.5,.8,.45,'#b9a2c4',x,1.3,8.3);box(shell,.8,.32,.48,deep,x,1.3,8.56);}
 label(shell,'BioGeoLab',9.5,1.55,0,.39,6.8,{fg:lime,size:150});
 part('case','Maleta portátil em corte',shell,[0,1,0],[0,-.2,0],'Gabinete com alça, travas, pés e passagens de cabos. O recorte frontal desta vista permite inspecionar a montagem. O sensor sísmico exige acoplamento mecânico definido no ensaio.','Gabinete autoral de laboratório, proposta de montagem','Envelope proposto: 240 × 170 × 60 mm, antes da alça.','Estrutura');
 const lid=new T.Group();frame(lid,24,17,.55,.95,mat(violet,.1,.55));
 const glass=new T.MeshPhysicalMaterial({color:'#b5a7cc',metalness:0,roughness:.15,transparent:true,opacity:.12,depthWrite:false,side:T.DoubleSide});slab(lid,21.7,14.7,.08,.25,glass,0,.03,0);
 for(const x of [-10.7,10.7])for(const z of [-7.3,7.3])screw(lid,x,.31,z,.19);
 label(lid,'BIOGEOLAB  •  FIELD / LAB',12,.65,0,.32,7.85,{fg:lime,size:72});
 for(const x of [-7.4,7.4])box(lid,1.5,.5,.55,mat('#baacc4',.5,.35),x,-.25,8.5);
 part('lid','Tampa com janela de inspeção',lid,[0,5.8,0],[0,11.5,-1.5],'A janela transparente e a tampa removível permitem acompanhar a organização interna. Vedações e resistência à água dependem do gabinete real selecionado.','Tampa autoral de inspeção','Proposta: 240 × 170 mm; fechamento a validar.','Estrutura');
 const plate=new T.Group();slab(plate,21,14,.25,.35,aluminum,0,0,0,[[-9.5,-6,.17],[9.5,-6,.17],[-9.5,6,.17],[9.5,6,.17]]);
 for(const x of [-9.5,9.5])for(const z of [-6,6])standoff(plate,x,-.5,z,.7);
 for(let i=0;i<9;i++)box(plate,.05,.012,11,'#89989f',-8+i*2,.14,0);
 label(plate,'AQUISIÇÃO  /  ARMAZENAMENTO  /  TEMPO',17,.55,0,.15,5.8,{fg:deep,size:57});
 label(plate,'3.3 V LOGIC  ·  USB INPUT  ·  RIGID SENSOR MOUNT',16,.35,0,.15,-5.8,{fg:deep,size:40});
 part('plate','Base rígida e espaçadores',plate,[0,2,0],[0,2.1,0],'Chassi interno que organiza os módulos. Fixe o ADXL355 rigidamente e registre a orientação; não o deixe suspenso nos fios durante a aquisição.','Placa de montagem e espaçadores','Área proposta: 210 × 140 mm.','Montagem');
 const feather=new T.Group();pcb(feather,2.28,5.23,'#20272b');headers(feather,-1.02,-1.9,16);headers(feather,1.02,-.88,12);
 slab(feather,1.8,1.9,.18,.05,'#364248',0,.13,1.2);slab(feather,1.5,1.27,.19,.05,mat('#c6c9cc',.85,.25),0,.31,1.0);
 label(feather,'ESP32\nPICO MINI 02',1.3,1.03,0,.415,1.0,{fg:'#343c46',size:64});
 cable(feather,[[-.72,.26,1.98],[-.72,.26,2.2],[-.42,.26,2.2],[-.42,.26,1.99],[-.12,.26,1.99],[-.12,.26,2.2],[.18,.26,2.2],[.18,.26,1.99],[.50,.26,1.99],[.50,.26,2.2],[.75,.26,2.2]],'#bfa34f',.024);
 usb(feather,0,.22,-2.42,'C');chip(feather,.46,.5,-.25,-1.42,'USB');chip(feather,.42,.42,-.38,-.45,'REG');smd(feather,.25,-.95,8);
 box(feather,.5,.25,.55,'#f4ede0',.55,.23,-1.85);box(feather,.36,.13,.035,'#3a3f42',.55,.24,-2.15);
 box(feather,.35,.24,.46,'#f4ede0',.56,.21,.05);box(feather,.026,.13,.29,'#3a3f42',.755,.21,.05);
 for(const z of [-1.9,-.5]){box(feather,.31,.08,.34,aluminum,-.72,.15,z);cyl(feather,.09,.065,'#171a20',-.72,.23,z,16);}
 led(feather,-.73,.18,'#e7526c');led(feather,.72,-1.20,'#d9ff73');
 label(feather,'FEATHER V2',1.35,.3,0,.085,-.93,{size:45});label(feather,'RST   USB-C',1.5,.25,0,.085,-2.06,{size:39});
 const left=['RST','3V','NC','GND','A0','A1','A2','A3','A4','A5','SCK','MO','MI','RX','TX','37'];
 const right=['BAT','EN','USB','13','12','27','33','15','32','14','SCL','SDA'];
 for(let i=0;i<16;i++)label(feather,left[i],.23,.14,-.74,.084,-1.9+i*.254,{rot:Math.PI/2,size:34});
 for(let i=0;i<12;i++)label(feather,right[i],.23,.14,.75,.084,-.88+i*.254,{rot:Math.PI/2,size:34});
 for(let i=0;i<5;i++)trace(feather,[[-.85,.078,-.5+i*.29],[-.55,.078,-.5+i*.29],[-.30,.078,.20+i*.20]],'#4d6658');
 part('esp32','Adafruit ESP32 Feather V2',feather,[-5,2.43,-.2],[-4.6,4.8,0],'Controlador com USB-C, antena, dois conectores e fileiras de pinos. Usa a pinagem própria da Feather V2; os números de I²C e SPI diferem do ESP32-DevKitC.','Adafruit ESP32 Feather V2 #5400','52,3 × 22,8 × 7,2 mm (referência do fabricante).','Controlador');
 const accel=new T.Group();pcb(accel,2.5,2.5,'#215aa0');slab(accel,.74,.65,.18,.06,mat('#d9d3c4',.65,.34),0,.22,.15);label(accel,'ADXL\n355',.62,.52,0,.32,.15,{fg:'#393e45',size:72});
 box(accel,1.65,.43,.45,'#18202a',0,.22,-1.15);
 const pins=[];for(let x=0;x<6;x++)for(let y=0;y<2;y++)pins.push([-.635+x*.254,.17+y*.254,-1.6]);instance(accel,new T.BoxGeometry(.06,.06,.58),mat('#c8ad62',.8,.28),pins);
 smd(accel,-.72,.52,4);smd(accel,.45,-.3,3);
 label(accel,'EVAL-ADXL355-PMDZ',2.15,.28,0,.09,.92,{size:39});label(accel,'X →    Y ↑',1.45,.25,0,.09,-.58,{size:48});
 for(const x of [-1.02,1.02])for(const z of [-.95,.95])standoff(accel,x,-.29,z,.43);
 part('adxl355','Acelerômetro ADXL355',accel,[3.8,2.5,-2.6],[3.6,6.6,-2.5],'Mede aceleração em três eixos por SPI. Pinos PMOD identificados; a montagem rígida, o filtro e a taxa efetiva fazem parte do ensaio.','Analog Devices EVAL-ADXL355-PMDZ','Placa de aproximadamente 25 × 25 mm.','Sensor');
 const sd=new T.Group();pcb(sd,2.6,3.2,'#265f83');slab(sd,1.65,1.90,.20,.08,mat('#b9c3cb',.85,.28),0,.20,.25);box(sd,1.44,.10,.045,'#1a232e',0,.22,1.23);
 for(const x of [-.68,.68])box(sd,.08,.10,1.5,mat('#8b979d',.8,.3),x,.36,.25);
 const card=new T.Group();slab(card,1.05,1.5,.08,.05,'#1e252d');label(card,'microSD\n32 GB',.92,1.05,0,.05,0,{size:72,fg:'#eee9de'});card.position.set(0,.2,1.3);sd.add(card);chip(sd,.35,.48,-.7,-.55,'U1',.10,.10);smd(sd,.0,-.8,4);
 for(let i=0;i<6;i++){cyl(sd,.065,.018,mat('#cfad53',.75,.3),-.635+i*.254,.08,-1.3,12);cyl(sd,.03,.02,'#132938',-.635+i*.254,.095,-1.3,10);}
 label(sd,'3V GND CLK DO DI CS',2.2,.24,0,.085,-1.03,{size:32});
 part('sd','Módulo microSD e cartão',sd,[-.6,2.43,3.0],[0,7.5,4.6],'Armazena blocos de amostras mesmo sem rede. O barramento SPI pode ser compartilhado com o sensor desde que cada dispositivo tenha seu próprio CS e transações coordenadas.','Breakout microSD SPI compatível com 3,3 V','Forma representativa; selecionar e conferir a revisão real.','Armazenamento');
 const rtc=new T.Group();pcb(rtc,2.3,1.76,'#267a91');chip(rtc,.90,.76,.0,-.1,'DS3231',.23,.08);cyl(rtc,.60,.20,mat('#b8c4c7',.8,.25),0,-.18,.08);label(rtc,'CR1220',.8,.4,0,-.29,.10,{size:50});
 smd(rtc,-.85,-.15,3);for(let i=0;i<6;i++){cyl(rtc,.06,.02,mat('#c6a64e',.75,.3),-.635+i*.254,.08,.68,12);cyl(rtc,.028,.023,'#1b363f',-.635+i*.254,.095,.68,10);}
 label(rtc,'DS3231 RTC',1.75,.24,0,.085,-.63,{size:43});label(rtc,'VIN GND SCL SDA',1.65,.17,0,.085,.46,{size:31});
 part('rtc','Relógio DS3231',rtc,[6.5,2.43,2.7],[5.0,5.0,3.5],'Referência de data e hora por I²C. Registre sincronização, origem do tempo e interrupções; o RTC não substitui a contagem monotônica das amostras.','Adafruit DS3231 Precision RTC #3013, proposta','23 × 17,6 × 7,2 mm (referência do fabricante).','Tempo');
 const env=bme();part('bme280','Sensor ambiental BME280',env,[6.5,2.43,5.0],[7.0,7.5,5.0],'Expansão para temperatura, pressão e umidade. Deve ficar em região ventilada e longe do calor do controlador para reduzir influência da montagem.','Adafruit BME280 #2652, expansão proposta','25,2 × 18,0 × 4,6 mm (referência do fabricante).','Sensor');
 const power=new T.Group();slab(power,5.8,8.7,1.45,.65,mat('#e2ddc5',.15,.43));slab(power,5.55,8.45,.035,.6,'#eeebd5',0,.75,0);label(power,'USB\nREGULADO',4,2.4,0,.78,0,{fg:deep,size:88});label(power,'5 V  ·  FONTE EXTERNA',4.6,.6,0,.78,3.1,{fg:deep,size:43});
 for(let i=0;i<4;i++)cyl(power,.09,.03,new T.MeshStandardMaterial({color:lime,emissive:lime,emissiveIntensity:.35}),-.45+i*.3,.79,-2.8,12);
 box(power,1.18,.42,.035,'#27303c',0,0,-4.37);box(power,.86,.15,.04,'#d2c6a3',0,0,-4.4);
 part('power','Alimentação USB externa',power,[-16.5,1.4,3.0],[-3,1.4,2],'Fonte USB regulada ou power bank fechado apropriado para a carga. A alimentação entra pelo USB-C da Feather; dimensione o consumo e confira a tensão antes da aquisição.','Acessório USB representativo, modelo a selecionar','Volume ilustrativo; dimensões dependem da fonte escolhida.','Energia');
 const spec=new T.Group();slab(spec,4.21,4.03,2.55,.18,mat('#424953',.75,.4));
 const face=box(spec,4.1,2.4,.08,'#d9dce0',0,0,2.05);for(let x of [-1.78,1.78])for(let y of [-.95,.95]){const sc=new T.Group();screw(sc,0,0,0,.10);sc.rotation.x=Math.PI/2;sc.position.set(x,y,2.10);spec.add(sc);}
 const port=new T.Group();cyl(port,.28,.55,mat('#b9b8b0',.85,.3),0,0,0,24);ring(port,.25,'#c9baa0',0,.3,0,.045);cyl(port,.07,.58,'#303a4c',0,0,0,16);port.rotation.x=Math.PI/2;port.position.set(.85,-.25,2.4);spec.add(port);
 usb(spec,-.8,-.3,-1.9,'C');for(let i=0;i<6;i++)box(spec,.045,.012,3.2,'#1e242e',-1.1+i*.45,1.29,0);
 label(spec,'OCEAN ST\nESPECTRÔMETRO',3.45,1.8,0,1.3,0,{fg:'#eae7db',size:71});
 const faceText=label(spec,'ENTRADA ÓPTICA',3.1,.5,0,0,0,{fg:'#282f3e',size:46});faceText.rotation.x=0;faceText.position.set(0,.7,2.11);
 cable(spec,[[.85,-.25,2.6],[1.5,-.2,4],[3.0,-.4,4.1],[3.6,-.8,2.1]],'#7f597f',.07);
 part('spectrometer','Espectrômetro externo Ocean ST',spec,[16.6,2.3,-2.0],[4,3.0,-1.8],'Referência de equipamento óptico comercial externo. Exporta um arquivo para análise no computador; não está ligado diretamente aos GPIO nem transforma o ESP32 em espectrômetro.','Ocean Optics Ocean ST, referência de instrumento externo','42,1 × 40,3 × 26,6 mm (fabricante); detalhes visuais aproximados.','Laboratório');
 const wire=(id,from,to,fromPoint,toPoint,color,label,detail,kind)=>C.push({id,from,to,fromPoint,toPoint,color,label,detail,kind});
 wire('usb-input','power','esp32',[0,0,-4.4],[0,.2,-2.8],'#c5ced5','USB → USB-C','Energia por cabo USB. Não conectar 5 V aos pinos de sensores de 3,3 V.','power');
 const fp={pwr:[-1.02,.4,-1.646],gnd:[-1.02,.4,-1.138],sck:[-1.02,.4,.64],mosi:[-1.02,.4,.894],miso:[-1.02,.4,1.148],cs:[1.02,.4,.39],sdcs:[1.02,.4,.644],drdy:[1.02,.4,1.152],scl:[1.02,.4,1.66],sda:[1.02,.4,1.914]};
 wire('adxl-power','esp32','adxl355',fp.pwr,[.635,.17,-1.6],'#eb6678','3V → PMOD P1.6','ADXL355-PMDZ alimentado em 3,3 V.','power');
 wire('adxl-ground','esp32','adxl355',fp.gnd,[.381,.17,-1.6],'#788795','GND → PMOD P1.5','Terra comum entre controlador e acelerômetro.','ground');
 wire('adxl-sck','esp32','adxl355',fp.sck,[.127,.17,-1.6],'#f5bd56','SCK / GPIO5 → P1.4','Relógio SPI. Usar transação com configuração do sensor.','data');
 wire('adxl-mosi','esp32','adxl355',fp.mosi,[-.381,.17,-1.6],'#68cdd2','MOSI / GPIO19 → P1.2','Comandos e registradores enviados ao acelerômetro.','data');
 wire('adxl-miso','adxl355','esp32',[-.127,.17,-1.6],fp.miso,'#a9d764','P1.3 → MISO / GPIO21','Amostras e registradores retornados pelo sensor.','data');
 wire('adxl-cs','esp32','adxl355',fp.cs,[-.635,.17,-1.6],'#ba8de6','GPIO27 → P1.1 / CS','Seleção exclusiva do acelerômetro.','data');
 wire('adxl-drdy','adxl355','esp32',[.127,.424,-1.6],fp.drdy,'#e5a8d1','P1.10 / DRDY → GPIO32','Indicação opcional de dado pronto para organizar a aquisição.','data');
 wire('sd-power','esp32','sd',fp.pwr,[-.635,.2,-1.3],'#eb6678','3V → microSD VCC','Breakout escolhido deve ser compatível com alimentação e lógica 3,3 V.','power');
 wire('sd-ground','esp32','sd',fp.gnd,[-.381,.2,-1.3],'#788795','GND → microSD GND','Referência comum; conferir consumo durante gravação.','ground');
 wire('sd-sck','esp32','sd',fp.sck,[-.127,.2,-1.3],'#f5bd56','SCK / GPIO5 → CLK','SPI compartilhado; cada periférico usa seu próprio CS.','data');
 wire('sd-mosi','esp32','sd',fp.mosi,[.381,.2,-1.3],'#68cdd2','MOSI / GPIO19 → DI','Dados escritos no cartão.','data');
 wire('sd-miso','sd','esp32',[.127,.2,-1.3],fp.miso,'#a9d764','DO → MISO / GPIO21','Respostas do cartão no barramento compartilhado.','data');
 wire('sd-cs','esp32','sd',fp.sdcs,[.635,.2,-1.3],'#ba8de6','GPIO33 → microSD CS','Seleção do cartão independente do CS do ADXL355.','data');
 wire('rtc-scl','esp32','rtc',fp.scl,[-.127,.2,.68],'#f5bd56','SCL / GPIO20 → RTC SCL','Pinagem própria da Feather V2 confirmada na variante oficial Arduino.','data');
 wire('rtc-sda','esp32','rtc',fp.sda,[.127,.2,.68],'#68cdd2','SDA / GPIO22 → RTC SDA','Barramento I²C; DS3231 usa endereço 0x68.','data');
 wire('rtc-power','esp32','rtc',fp.pwr,[-.635,.2,.68],'#eb6678','3V → RTC VIN','Alimentação do breakout DS3231 em 3,3 V.','power');
 wire('rtc-ground','esp32','rtc',fp.gnd,[-.381,.2,.68],'#788795','GND → RTC GND','Terra comum do relógio.','ground');
 wire('bme-scl','rtc','bme280',[-.127,.2,.68],[.112,.2,.65],'#f5bd56','SCL → BME280 SCK','Mesmo barramento I²C do RTC; conferir endereço e pull-ups.','data');
 wire('bme-sda','rtc','bme280',[.127,.2,.68],[.62,.2,.65],'#68cdd2','SDA → BME280 SDI','BME280 em I²C; endereço 0x76 ou 0x77 conforme breakout.','data');
 wire('bme-power','rtc','bme280',[-.635,.2,.68],[-.65,.2,.65],'#eb6678','3V → BME280 VIN','Extensão da alimentação de 3,3 V, dentro do orçamento de corrente.','power');
 wire('bme-ground','rtc','bme280',[-.381,.2,.68],[-.142,.2,.65],'#788795','GND → BME280 GND','Referência comum do sensor ambiental.','ground');
 return {parts:P,connections:C,camera:{position:[34,29,36],target:[0,2.5,0],minDistance:10,maxDistance:100},note:'Modelagem didática autoral baseada em dispositivos reais, com detalhes e dimensões aproximados. O gabinete não é CAD para fabricação; o espectrômetro é externo, sem conexão aos GPIO. Confirme a revisão de cada módulo antes de montar.'};
}
