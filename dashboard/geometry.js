
// Illustrative geometry; horizontal node coordinates are the actual prediction grid.
function geometryTraces(){
const xmin=M.X[0]-12,xmax=M.X.at(-1)+12,ymin=M.Y[0],ymax=M.Y.at(-1),traces=[];
const edges=[0,-.06,-.25,-.50,-.75,-1],names=['Fill','Clay','Sand','Gravel','Marl'],colours=['#90745b','#c8b394','#c5a166','#858c8e','#626c76'];
const soil=M.soils.filter(s=>Number(s['Soil model'])===D.features['Soil model']);
function face(y,x,z,colour,opacity,hover){return {type:'mesh3d',x:y,y:x,z,i:[0,0],j:[1,2],k:[2,3],color:colour,opacity,flatshading:true,showlegend:false,hovertemplate:hover+'<extra></extra>',meta:'block'};}
for(let l=0;l<5;l++){const top=edges[l],bottom=edges[l+1],prop=soil[l];let hover=names[l]+' · soil model '+D.features['Soil model'];if(prop)hover+='<br>E '+prop['Young’s modulus (MPa)']+' MPa · c '+prop['Cohesion (kPa)']+' kPa<br>φ '+prop['Friction angle (°)']+'°';
traces.push(face([ymin,ymax,ymax,ymin],[xmin,xmin,xmin,xmin],[top,top,bottom,bottom],colours[l],.32,hover));
traces.push(face([ymin,ymax,ymax,ymin],[xmax,xmax,xmax,xmax],[top,top,bottom,bottom],colours[l],.32,hover));
traces.push(face([ymin,ymin,ymin,ymin],[xmin,xmax,xmax,xmin],[top,top,bottom,bottom],colours[l],.38,hover));
traces.push(face([ymax,ymax,ymax,ymax],[xmin,xmax,xmax,xmin],[top,top,bottom,bottom],colours[l],.28,hover));
traces.push({type:'scatter3d',x:[ymin],y:[xmax+1.8],z:[(top+bottom)/2],mode:'text',text:[names[l]],textfont:{size:12,color:themePalette().text},showlegend:false,hoverinfo:'skip',meta:'label'});
}
for(const [a,b] of [[xmin,M.X[0]],[M.X.at(-1),xmax]])traces.push(face([ymin,ymax,ymax,ymin],[a,a,b,b],[0,0,0,0],'#72926b',.35,'Illustrative ground surface outside prediction area'));
traces.push(face([ymin,ymax,ymax,ymin],[xmin,xmin,xmax,xmax],[-1,-1,-1,-1],'#59656d',.18,'Illustrative block base'));
for(const [cx,name,colour] of [[0,'Tunnel A','#c2d6df'],[-12,'Tunnel B','#9eb8c8']]){
let tx=[],ty=[],tz=[],ii=[],jj=[],kk=[],N=48;for(let end=0;end<2;end++)for(let a=0;a<N;a++){let angle=a*2*Math.PI/N;tx.push(end?ymax:ymin);ty.push(cx+2.6*Math.cos(angle));tz.push(-.625+.057*Math.sin(angle));}
for(let a=0;a<N;a++){let b=(a+1)%N;ii.push(a,a);jj.push(b,N+b);kk.push(N+b,N+a);}
traces.push({type:'mesh3d',x:tx,y:ty,z:tz,i:ii,j:jj,k:kk,color:colour,opacity:.92,showlegend:false,hovertemplate:name+' · illustrative lining<br>Axis X = '+cx+' m<extra></extra>',meta:'tunnel'});
for(let yy=ymin;yy<=ymax;yy+=5){const angles=Array.from({length:49},(_,a)=>a*2*Math.PI/48);traces.push({type:'scatter3d',x:angles.map(()=>yy),y:angles.map(a=>cx+2.6*Math.cos(a)),z:angles.map(a=>-.625+.057*Math.sin(a)),mode:'lines',line:{color:'#6b8392',width:2},showlegend:false,hoverinfo:'skip',meta:'ring'});}
traces.push({type:'scatter3d',x:[ymin+3],y:[cx],z:[-.54],mode:'text',text:[name],textfont:{color:themePalette().node,size:13},showlegend:false,hoverinfo:'skip',meta:'label'});
}
const o=Number($('origin').value),t=o+H,layer=$('layer').value,field=M.X.map((_,ix)=>M.Y.map((_,iy)=>layer==='pred'?-pval(o,H,ix,iy):layer==='true'?-ref(t,ix,iy):pval(o,H,ix,iy)-ref(t,ix,iy))),lim=layer==='error'?D.errorLimit:D.settlementLimit;
traces.push({type:'surface',x:M.Y,y:M.X,z:M.X.map(()=>M.Y.map(()=>.008)),surfacecolor:field,cmin:layer==='error'?-lim:D.settlementMin,cmax:lim,colorscale:layer==='error'?'RdBu':'Viridis',reversescale:layer==='error',showscale:false,opacity:.92,hovertemplate:'Surface node · X %{y} m · Y %{x} m<br>Click to show displacement curve<extra></extra>',meta:'prediction-area'});
traces.push({type:'scatter3d',x:[ymin,ymax,ymax,ymin,ymin],y:[M.X[0],M.X[0],M.X.at(-1),M.X.at(-1),M.X[0]],z:[.012,.012,.012,.012,.012],mode:'lines',line:{color:'#ff755e',width:5,dash:'dash'},showlegend:false,hoverinfo:'skip',meta:'area-outline'});
if($('geoNodes').checked){let gx=[],gy=[],gz=[];for(const x of M.X)for(const y of M.Y){gx.push(y);gy.push(x);gz.push(.016);}traces.push({type:'scatter3d',x:gx,y:gy,z:gz,mode:'markers',marker:{size:1.5,color:'#d8eef3',opacity:.5},showlegend:false,hovertemplate:'X %{y} m · Y %{x} m<br>Click surface node<extra></extra>',meta:'surface-node'});}
traces.push({type:'scatter3d',x:[M.Y[IY]],y:[M.X[IX]],z:[.03],mode:'markers',marker:{size:7,color:themePalette().node,symbol:'diamond',line:{color:'#ff975b',width:2}},name:'Selected node',hovertemplate:'Selected X %{y} m · Y %{x} m<extra></extra>',meta:'surface-node'});
traces.push({type:'scatter3d',x:[M.Y[IY],M.Y[IY]],y:[M.X[IX],M.X[IX]],z:[.025,-1],mode:'lines',line:{color:'#ff975b',width:2,dash:'dash'},showlegend:false,hoverinfo:'skip',meta:'projection'});
traces.push(...epbGeometryTraces());return traces;}
let geoRendering=false,geoDirty=false,geoHooked=false;
function renderGeometry(){if(!D)return;if(geoRendering){geoDirty=true;return;}geoRendering=true;const lay={template:lightTheme?'plotly_white':'plotly_dark',paper_bgcolor:themePalette().paper,plot_bgcolor:themePalette().paper,font:{color:themePalette().text,size:11},margin:{l:0,r:0,t:45,b:0},title:{text:'Soil model '+D.features['Soil model']+' · target excavation step '+(Number($('origin').value)+H),font:{size:13}},showlegend:false,uirevision:'illustrative-ground-camera',scene:{xaxis:{title:{text:'Y · longitudinal (m)'},range:[M.Y[0]-2,M.Y.at(-1)+2],gridcolor:themePalette().grid},yaxis:{title:{text:'X · transverse (m)'},range:[M.X[0]-14,M.X.at(-1)+15],gridcolor:themePalette().grid},zaxis:{title:{text:'Schematic depth'},range:[-1.06,.12],tickvals:[0,-1],ticktext:['Ground surface','Illustrative base'],gridcolor:themePalette().grid},aspectmode:'manual',aspectratio:{x:1.4,y:1.5,z:.9},camera:{eye:{x:-1.65,y:1.55,z:.85}}}};Promise.resolve(Plotly.react('geometry',geometryTraces(),lay,config)).then(()=>{geoRendering=false;if(!geoHooked){geoHooked=true;$('geometry').on('plotly_click',selectGeometryNode);}if(geoDirty){geoDirty=false;renderGeometry();}}).catch(error=>{geoRendering=false;$('status').textContent='Geometry redraw issue: '+error.message;});}
function selectGeometryNode(ev){if(!D||geoRendering||!ev.points.length)return;const p=ev.points.find(p=>p.data&&['surface-node','prediction-area'].includes(p.data.meta));if(!p||typeof p.x!=='number'||typeof p.y!=='number')return;const yy=nearest(M.Y,p.x),xx=nearest(M.X,p.y);if(yy===IY&&xx===IX)return;IY=yy;IX=xx;$('status').textContent='Selected surface node X='+M.X[IX]+' m, Y='+M.Y[IY]+' m';setTimeout(render,0);}
$('geoNodes').onchange=renderGeometry;
if(D)renderGeometry();
