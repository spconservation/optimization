// COPYRIGHT TAREK A LAHLOU 2015
function blSetup(){return{Start:function(t){t.timer=setInterval(function(){t.process(),_blStem(t)},0)},Step:function(t){t.process(),console.log(t.readout()),_blStem(t)},Stop:function(t){clearInterval(t.timer),_blStem(t)},Reset:function(t){t.reset(),_blStem(t)},Quit:function(t){clearInterval(t.timer),t=null}}}function _blSetupDistSys(t){var e=new Firebase("https://spconservation.firebaseio.com/"+t),r=e.push(navigator.userAgent);r.onDisconnect().remove(),r.meta={Name:r.key(),Type:t,solverType:1,filterCoeff:.5,visualType:null,visualDelay:1,visualTimer:null},r.meta.vis=function(){r.meta.visualTimer=setTimeout(function(){1==r.meta.visualType?_blDistStemSetup(r):2==r.meta.visualType&&(_blDistComputeSetup(r),_blDistComputeResourceSetup(r)),_blUpdateIterationCount(r),r.meta.vis()},1e3*r.meta.visualDelay)};var s=document.getElementById("visDelayID1");s.addEventListener("change",function(){r.meta.visualDelay=parseFloat(s.value),document.getElementById("visualDelayDisplay1").innerHTML=s.value,document.getElementById("visualDelayDisplay2").innerHTML=s.value,clearTimeout(r.meta.visualTimer),r.meta.vis()},!1);var a=document.getElementById("visDelayID2");a.addEventListener("change",function(){r.meta.visualDelay=parseFloat(a.value),document.getElementById("visualDelayDisplay1").innerHTML=a.value,document.getElementById("visualDelayDisplay2").innerHTML=a.value,clearTimeout(r.meta.visualTimer),r.meta.vis()},!1),r.ref={enable:r.child("controls").child("enable"),state:r.child("controls").child("state"),nominal:r.child("controls").child("nominal"),random:r.child("controls").child("random"),solverType:r.child("controls").child("solver"),filterCoeff:r.child("controls").child("filter"),K:r.child("controls").child("K"),active:r.child("active"),computeHist:r.child("computeHist"),compute:r.child("compute"),c:r.child("c"),d:r.child("d")},r.ref.enable.set(0),r.ref.enable.on("value",function(t){1==t.val()&&(document.getElementById("disableID").innerHTML="All Workers Disconnected")}),r.ref.state.set(0),r.ref.state.on("value",function(t){document.getElementById("workerStatusID").innerHTML=1==t.val()?"Computing":"Waiting"}),r.ref.nominal.set(.1),r.ref.nominal.on("value",function(t){document.getElementById("nominalID").innerHTML=t.val()});var n=document.getElementById("nominalDelayID");n.addEventListener("change",function(){r.ref.nominal.set(n.value)},!1),r.ref.random.set(.1),r.ref.random.on("value",function(t){document.getElementById("randomID").innerHTML=t.val()});var m=document.getElementById("randomDelayID");return m.addEventListener("change",function(){r.ref.random.set(m.value)},!1),r.ref.solverType.set(r.meta.solverType),r.ref.filterCoeff.set(r.meta.filterCoeff),r.ref.active.on("value",function(t){document.getElementById("numWorkersID").innerHTML=t.numChildren().toString()}),new QRCode("qrCodeID",{text:"http://optimization.SPConservation.org/#/dist/"+r.meta.distType+".html?"+r.meta.Type+"?"+r.meta.Name,width:96,height:96,colorDark:"#000000",colorLight:"#ffffff",correctLevel:QRCode.CorrectLevel.H}),r.meta.vis(),document.getElementById("visualDelayDisplay1").innerHTML=r.meta.visualDelay,document.getElementById("visualDelayDisplay2").innerHTML=r.meta.visualDelay,r}function blBPExample(){numeric.largeArray=225e4,numeric.precision=20;var t=128,e=60,r=20,s=_blRandMat(e,t),a=_blSparseVec(t,r,-8,10);console.log(a);var n=numeric.dot(s,a);return{A:numeric.prettyPrint(s),b:numeric.prettyPrint(n)}}function _blBPparams(params){return A=eval(params.A),b=eval(params.b),{M:A.length,N:A[0].length,A:A,b:b,readoutStart:0,readoutStop:A[0].length}}function _blBPPreSystem(t){return preSystem={Q:_blA2Q(t.A),S:_blEye(t.M),f:numeric.dot(-2,t.b)},preSystem}function blBPLocal(t){this.params=_blBPparams(t),this.timer=null,this.meta={solverType:2,iterCount:0,filterCoeff:.5},this.preSystem=_blBPPreSystem(this.params),this.system=_blReduce2x2(2,this.preSystem.Q,this.preSystem.S,this.preSystem.f,this.params.N,this.params.N),this.LI={},this.LIName="li",this.LI=_blGenerateLI(this.LIName,this.system.G,this.system.dInit,[.5,.5]),this.CR={};for(var e=0;e<this.system.G.length;e++)this.CR["cr"+String(e)]=function(t){return Math.abs(t)<=1?-t:t>1?t-2:t+2};this.process=_blProcess,this.readout=_blReadout,this.reset=_blReset,this.reset()}function blBPDist(t,e){mySystem=_blSetupDistSys(e),mySystem.params=_blBPparams(t),mySystem.meta.distType="distWork",mySystem.preSystem=_blBPPreSystem(mySystem.params),mySystem.system=_blReduce2x2(2,mySystem.preSystem.Q,mySystem.preSystem.S,mySystem.preSystem.f,mySystem.params.N,mySystem.params.N),mySystem.ref.K.set(mySystem.system.G.length);for(var r=0;r<mySystem.system.G.length;r++)mySystem.ref.compute.child(r).set({row:numeric.getBlock(mySystem.system.G,[r,0],[r,mySystem.system.G.length-1])[0],f:mySystem.system.dInit[r],cr:"if(Math.abs(x)<=1){y=-x;} else if(x>1){y=x-2;} else{y=x+2;}"}),mySystem.ref.c.child(String(r)).set(0),mySystem.ref.d.child(String(r)).set(mySystem.system.dInit[r]);return mySystem.readout={ccoeff:.5,dcoeff:.5},mySystem.readout.readoutType=1,mySystem}function blLPineqExample(){return numeric.largeArray=225e4,numeric.precision=20,f=[-4,-3,-3,-4,-3,-2],A=[[2,3,2,1,1,3],[2,1,3,1,3,2],[1,2,1,4,2,2]],b=[500,750,500],{A:numeric.prettyPrint(A),b:numeric.prettyPrint(b),f:numeric.prettyPrint(f)}}function _blLPineqparams(params){return A=eval(params.A),b=eval(params.b),f=eval(params.f),{M:A.length,N:A[0].length,A:A,b:b,f:f,readoutStart:0,readoutStop:A[0].length}}function _blLPineqPreSystem(t){for(var e=_blEye(t.M+t.N),r=0;r<t.M;r++)e[r][r]=-1;for(var s=new Array(t.M+t.N),r=0;r<t.M+t.N;r++)s[r]=r<t.M?2*t.b[r]:-2*t.f[r-t.M];return preSystem={Q:_blA2Q(numeric.transpose(numeric.transpose(_blZeros(t.N,t.M).concat(_blEye(t.M))).concat(numeric.transpose(_blEye(t.N).concat(numeric.mul(-1,t.A)))))),S:e,f:s},preSystem}function blLPineqLocal(t){this.params=_blLPineqparams(t),this.timer=null,this.meta={solverType:3,iterCount:0,filterCoeff:.5},this.preSystem=_blLPineqPreSystem(this.params),this.system=_blReduce2x2(1,this.preSystem.Q,this.preSystem.S,this.preSystem.f,this.params.N+this.params.M,this.params.N+this.params.M),this.LI={},this.LIName="li",this.LI=_blGenerateLI(this.LIName,this.system.G,this.system.dInit,[-.5,.5]),this.CR={};for(var e=0;e<this.system.G.length;e++)this.CR["cr"+String(e)]=function(t){return-1*Math.abs(t)};this.process=_blProcess,this.readout=_blReadout,this.reset=_blReset,this.reset()}function blLPineqDist(t,e){mySystem=_blSetupDistSys(e),mySystem.params=_blLPineqparams(t),mySystem.meta.distType="distWork",mySystem.preSystem=_blLPineqPreSystem(mySystem.params),mySystem.system=_blReduce2x2(1,mySystem.preSystem.Q,mySystem.preSystem.S,mySystem.preSystem.f,mySystem.params.M+mySystem.params.N,mySystem.params.M+mySystem.params.N),mySystem.ref.K.set(mySystem.system.G.length);for(var r=0;r<mySystem.system.G.length;r++)mySystem.ref.compute.child(r).set({row:numeric.getBlock(mySystem.system.G,[r,0],[r,mySystem.system.G.length-1])[0],f:mySystem.system.dInit[r],cr:"y=-Math.abs(x);"}),mySystem.ref.c.child(String(r)).set(0),mySystem.ref.d.child(String(r)).set(mySystem.system.dInit[r]);return mySystem.readout={ccoeff:-.5,dcoeff:.5},mySystem.readout.readoutType=3,mySystem}function blLPineqDistSetupPlot(t,e){for(var r=new Array(mySystem.params.readoutStop-mySystem.params.readoutStart-1),s=0;s<r.length;s++)r[s]=mySystem.readout.ccoeff*t[s]+mySystem.readout.dcoeff*e[s];return r}function blDECODEL1Example(){numeric.largeArray=225e4,numeric.precision=20;var t=60,e=256,r=60,s=_blRandMat(e,t),a=_blSparseVec(t,r,0,1);console.log(a);var n=new Array(e);n=numeric.dot(s,a);for(var m=_blRandMat(e,Math.round(.2*r),0,1),i=0;e>i;i++)m[i]&&(n[i]=n[i]+5*Math.random());return{A:numeric.prettyPrint(s),b:numeric.prettyPrint(n)}}function _blDECODEL1params(params){return A=eval(params.A),b=eval(params.b),{M:A.length,N:A[0].length,A:A,b:b,readoutStart:0,readoutStop:A[0].length}}function _blDECODEL1PreSystem(t){preSystem={Q:_blA2Q(numeric.transpose(numeric.transpose(t.A).concat(numeric.mul(_blEye(t.M),-1)))),S:_blZeros(t.N+t.M,t.N+t.M),f:new Array(t.N+t.M)};for(var e=0;e<t.N+t.M;e++)e<t.N?(preSystem.S[e][e]=1,preSystem.f[e]=0):(preSystem.S[e][e]=-1,preSystem.f[e]=2*t.b[e-t.N]);return preSystem}function blDECODEL1Local(t){this.params=_blDECODEL1params(t),this.timer=null,this.meta={solverType:2,iterCount:0,filterCoeff:.5},this.preSystem=_blDECODEL1PreSystem(this.params),this.system=_blReduce2x2(1,this.preSystem.Q,this.preSystem.S,this.preSystem.f,this.params.M+this.params.N,this.params.M+this.params.N),this.LI={},this.LIName="li",this.LI=_blGenerateLI(this.LIName,this.system.G,this.system.dInit,[.5,.5]),this.CR={};for(var e=0;e<this.system.G.length;e++)this.CR["cr"+String(e)]=function(t){return Math.abs(t)<=1?t:t>1?-t+2:-t-2};this.readoutP=numeric.inv(numeric.sub(_blEye(this.system.Q11.length),numeric.dot(this.system.Q11,this.preSystem.S))),this.process=_blProcess,this.readout=function(){for(var t=this.LI[this.LIName].d,e=new Array(t.length),r=0;r<t.length;r++)e[r]=this.LI[this.LIName].terms["term"+String(r)].c;for(var s=numeric.add(numeric.dot(numeric.dot(this.readoutP,this.system.Q11),this.preSystem.f),numeric.dot(numeric.dot(this.readoutP,this.system.Q12),e)),a=numeric.dot(this.preSystem.S,s),n=numeric.mul(.5,numeric.add(a,s)),m=new Array(this.params.readoutStop-this.params.readoutStart),r=0;r<m.length;r++)m[r]=n[r]>=.5?1:0;return m},this.reset=_blReset,this.reset()}function blDECODEL1Dist(t,e){mySystem=_blSetupDistSys(e),mySystem.params=_blDECODEL1params(t),mySystem.meta.distType="distWork",mySystem.preSystem=_blDECODEL1PreSystem(mySystem.params),mySystem.system=_blReduce2x2(1,mySystem.preSystem.Q,mySystem.preSystem.S,mySystem.preSystem.f,mySystem.params.M+mySystem.params.N,mySystem.params.M+mySystem.params.N),mySystem.readoutP=numeric.inv(numeric.sub(_blEye(mySystem.system.Q11.length),numeric.dot(mySystem.system.Q11,mySystem.preSystem.S))),mySystem.ref.K.set(mySystem.system.G.length);for(var r=0;r<mySystem.system.G.length;r++)mySystem.ref.compute.child(r).set({row:numeric.getBlock(mySystem.system.G,[r,0],[r,mySystem.system.G.length-1])[0],f:mySystem.system.dInit[r],cr:"if(Math.abs(x)<=1){y=x;} else if(x>1){y=-x+2;} else{y=-x-2;};"}),mySystem.ref.c.child(String(r)).set(0),mySystem.ref.d.child(String(r)).set(mySystem.system.dInit[r]);return mySystem.readout={ccoeff:.5,dcoeff:.5},mySystem.readout.readoutType=2,mySystem}function blDECODEL1DistSetupPlot(t,e){for(var r=t,s=numeric.add(numeric.dot(numeric.dot(mySystem.readoutP,mySystem.system.Q11),mySystem.preSystem.f),numeric.dot(numeric.dot(mySystem.readoutP,mySystem.system.Q12),r)),a=numeric.dot(mySystem.preSystem.S,s),n=numeric.mul(.5,numeric.add(a,s)),m=new Array(mySystem.params.readoutStop-mySystem.params.readoutStart),i=0;i<m.length;i++)m[i]=n[i]>=.5?1:0;return m}function blLASSOExample(){numeric.largeArray=225e4,numeric.precision=20;var t=128,e=60,r=8,s=_blRandMat(e,t),a=_blSparseVec(t,r,-5,5);console.log(a);var n=numeric.dot(s,a);return{A:numeric.prettyPrint(s),b:numeric.prettyPrint(n),rhoe:2}}function _blLASSOparams(params){return A=eval(params.A),b=eval(params.b),{M:A.length,N:A[0].length,A:A,b:b,rhoe:params.rhoe,readoutStart:0,readoutStop:A[0].length}}function _blLASSOPreSystem(t){preSystem={Q:_blA2Q(numeric.transpose(numeric.transpose(t.A).concat(numeric.mul(_blEye(t.M),-1)))),S:_blZeros(2*t.M,2*t.M),f:new Array(2*t.M)};for(var e=0;e<2*t.M;e++)e<t.M?(preSystem.S[e][e]=-1,preSystem.f[e]=2*t.b[e]):(preSystem.S[e][e]=(t.rhoe-1)/(1+t.rhoe),preSystem.f[e]=0);return preSystem}function blLASSOLocal(t){this.params=_blLASSOparams(t),this.timer=null,this.meta={solverType:2,iterCount:0,filterCoeff:.5},this.preSystem=_blLASSOPreSystem(this.params),this.system=_blReduce2x2(2,this.preSystem.Q,this.preSystem.S,this.preSystem.f,this.params.N,this.params.N),this.LI={},this.LIName="li",this.LI=_blGenerateLI(this.LIName,this.system.G,this.system.dInit,[.5,.5]),this.CR={};for(var e=0;e<this.system.G.length;e++)this.CR["cr"+String(e)]=function(t){return Math.abs(t)<=1?-t:t>1?t-2:t+2};this.process=_blProcess,this.readout=_blReadout,this.reset=_blReset,this.reset()}function blLASSODist(t,e){mySystem=_blSetupDistSys(e),mySystem.params=_blLASSOparams(t),mySystem.meta.distType="distWork",mySystem.preSystem=_blLASSOPreSystem(mySystem.params),mySystem.system=_blReduce2x2(2,mySystem.preSystem.Q,mySystem.preSystem.S,mySystem.preSystem.f,mySystem.params.N,mySystem.params.N),mySystem.ref.K.set(mySystem.system.G.length);for(var r=0;r<mySystem.system.G.length;r++)mySystem.ref.compute.child(r).set({row:numeric.getBlock(mySystem.system.G,[r,0],[r,mySystem.system.G.length-1])[0],f:mySystem.system.dInit[r],cr:"if(Math.abs(x)<=1){y=-x;} else if(x>1){y=x-2;} else{y=x+2;}"}),mySystem.ref.c.child(String(r)).set(0),mySystem.ref.d.child(String(r)).set(mySystem.system.dInit[r]);return mySystem.readout={ccoeff:.5,dcoeff:.5},mySystem.readout.readoutType=1,mySystem}function blNNLSExample(){numeric.largeArray=225e4,numeric.precision=20;var t=100,e=128,r=60,s=_blRandMat(e,t),a=_blSparseVec(t,r,0,15);console.log(a);var n=numeric.dot(s,a);return{A:numeric.prettyPrint(s),b:numeric.prettyPrint(n)}}function _blNNLSparams(params){return A=eval(params.A),b=eval(params.b),{M:A.length,N:A[0].length,A:A,b:b,readoutStart:0,readoutStop:A[0].length}}function _blNNLSPreSystem(t){preSystem={Q:_blA2Q(numeric.transpose(numeric.transpose(t.A).concat(numeric.mul(_blEye(t.M),-1)))),S:_blZeros(2*t.M,2*t.M),f:new Array(2*t.M)};for(var e=0;e<2*t.M;e++)e<t.M?(preSystem.S[e][e]=-1,preSystem.f[e]=2*t.b[e]):(preSystem.S[e][e]=0,preSystem.f[e]=0);return preSystem}function blNNLSLocal(t){this.params=_blNNLSparams(t),this.timer=null,this.meta={solverType:2,iterCount:0,filterCoeff:.5},this.preSystem=_blNNLSPreSystem(this.params),this.system=_blReduce2x2(2,this.preSystem.Q,this.preSystem.S,this.preSystem.f,this.params.N,this.params.N),this.LI={},this.LIName="li",this.LI=_blGenerateLI(this.LIName,this.system.G,this.system.dInit,[.5,.5]),this.CR={};for(var e=0;e<this.system.G.length;e++)this.CR["cr"+String(e)]=function(t){return Math.abs(t)};this.process=_blProcess,this.readout=_blReadout,this.reset=_blReset,this.reset()}function blNNLSDist(t,e){mySystem=_blSetupDistSys(e),mySystem.params=_blLNNLSparams(t),mySystem.meta.distType="distWork",mySystem.preSystem=_blNNLSPreSystem(mySystem.params),mySystem.system=_blReduce2x2(2,mySystem.preSystem.Q,mySystem.preSystem.S,mySystem.preSystem.f,mySystem.params.N,mySystem.params.N),mySystem.ref.K.set(mySystem.system.G.length);for(var r=0;r<mySystem.system.G.length;r++)mySystem.ref.compute.child(r).set({row:numeric.getBlock(mySystem.system.G,[r,0],[r,mySystem.system.G.length-1])[0],f:mySystem.system.dInit[r],cr:"y=Math.abs(x);"}),mySystem.ref.c.child(String(r)).set(0),mySystem.ref.d.child(String(r)).set(mySystem.system.dInit[r]);return mySystem.readout={ccoeff:.5,dcoeff:.5},mySystem.readout.readoutType=1,mySystem}function _blProcess(){1==this.meta.solverType?_blProcessIterative(this,1,1-document.getElementById("ccProb").value):2==this.meta.solverType?_blProcessIncrement(this,1,1-document.getElementById("ccProb").value):3==this.meta.solverType?_blProcessFilteredIterative(this,1,1-document.getElementById("ccProb").value):4==this.meta.solverType&&_blProcessFilteredIncrement(this,1,1-document.getElementById("ccProb").value)}function _blProcessIterative(t,e,r){t.meta.iterCount+=e*r;for(var s=t.LI[t.LIName].d,a=new Array(s.length),n=0;n<s.length;n++)Math.random()<=r?(a[n]=t.CR["cr"+String(n)](s[n]),t.LI[t.LIName].terms["term"+String(n)].c=a[n]):a[n]=t.LI[t.LIName].terms["term"+String(n)].c;t.LI[t.LIName].d=numeric.add(numeric.dot(t.system.G,a),t.system.dInit)}function _blProcessIncrement(t,e,r){t.meta.iterCount+=e*r;for(var s=0;e>s;s++)for(var a=t.LI[t.LIName].K,n=0;a>n;n++)if(Math.random()<=r){sysLI=t.LI[t.LIName].terms["term"+String(n)];for(var m=sysLI.c,i=sysLI.g,l=sysLI.crkey,o=t.LI[t.LIName].d,y=t.CR[l](o[String(n)]),c=y-m,u=new Array(i.length),d=0;d<i.length;d++)u[d]=i[d]*c;for(var d=0;d<u.length;d++)t.LI[t.LIName].d[d]+=u[d];sysLI.c+=c}}function _blProcessFilteredIterative(t,e,r){t.meta.iterCount+=e*r;for(var s=t.LI[t.LIName].d,a=new Array(s.length),n=0;n<s.length;n++)Math.random()<=r?(a[n]=t.CR["cr"+String(n)](s[n]),t.LI[t.LIName].terms["term"+String(n)].c=a[n]):a[n]=t.LI[t.LIName].terms["term"+String(n)].c;for(var m=numeric.add(numeric.dot(t.system.G,a),t.system.dInit),i=new Array(s.length),n=0;n<s.length;n++)i[n]=(1-t.meta.filterCoeff)*s[n]+t.meta.filterCoeff*m[n];t.LI[t.LIName].d=i}function _blProcessFilteredIncrement(t,e,r){t.meta.iterCount+=e*r;for(var s=0;e>s;s++)for(var a=t.LI[t.LIName].K,n=0;a>n;n++)if(Math.random()<=r){for(var m=t.LI[t.LIName].terms["term"+String(n)],i=m.g,l=m.crkey,o=m.c,y=t.LI[t.LIName].d,c=t.LI[t.LIName].deltaD,u=t.CR[l](y[String(n)]),d=u-o,p=t.meta.filterCoeff*d,h=new Array(i.length),S=0;S<i.length;S++)h[S]=i[S]*p+(1-t.meta.filterCoeff)*c[S];for(var S=0;S<h.length;S++)t.LI[t.LIName].d[S]+=h[S],t.LI[t.LIName].deltaD[S]=h[S];m.c+=d}}function _blReset(){this.meta.iterCount=0;for(var t=this.LI[this.LIName].d.length,e=0;t>e;e++)this.LI[this.LIName].d[e]=this.LI[this.LIName].dInit[e],this.LI[this.LIName].terms["term"+String(e)].c=0}function _blReadout(){for(var t=new Array(this.params.readoutStop-this.params.readoutStart-1),e=this.LI[this.LIName].d,r=this.params.readoutStart;r<this.params.readoutStop;r++)t[r]=this.LI[this.LIName].terms["term"+String(r)].readout[0]*this.LI[this.LIName].terms["term"+String(r)].c+this.LI[this.LIName].terms["term"+String(r)].readout[1]*e[r];return t}function _blGenerateLI(t,e,r,s){LI={},LI[t]={K:e.length,d:[],deltaD:[],dInit:[],terms:{}};for(var a=0;a<e.length;a++)LI[t].d[String(a)]=r[String(a)],LI[t].deltaD[String(a)]=0,LI[t].dInit[String(a)]=r[String(a)],LI[t].terms["term"+String(a)]={c:0,crkey:"cr"+String(a),readout:s,g:numeric.getBlock(e,[a,0],[a,e.length-1])[0]};return LI}function _blStem(t){document.getElementById("iterCt").innerHTML="Iteration (equivalent count): "+parseFloat(t.meta.iterCount).toFixed(2),$("#myPlot").empty(),$("#myPlot").css("height","250px"),$(".tooltip").remove();var e={top:10,right:20,bottom:30,left:30};width=$("#plotEnv").width()-e.left-e.right,height=250-e.top-e.bottom;for(var r=t.readout(),s=new Array(r.length),a=0;a<r.length;a++)s[a]=a;var n=function(t){return t};xScale=d3.scale.linear().range([0,width]),xMap=function(t){return xScale(n(t))},xAxis=d3.svg.axis().scale(xScale).orient("bottom");var m=function(t){return t};yScale=d3.scale.linear().range([height,0]),yMap=function(t){return yScale(m(r[t]))},yAxis=d3.svg.axis().scale(yScale).orient("left");var i=(d3.select("#myPlot").attr("width",width+e.left+e.right).attr("height",height),d3.select("#myPlot").append("svg").attr("width",width+e.left+e.right).attr("height",height+e.top+e.bottom).append("g").attr("transform","translate("+e.left+","+e.top+")")),l=d3.select("body").append("div").attr("class","tooltip").attr("id","tooltipID").style("opacity",0);xScale.domain([0,r.length-1]),mx=Math.max(d3.max(r)+1,0),mn=Math.min(d3.min(r)-1,0),cen=mx/(mx-mn),yScale.domain([mn,mx]),i.append("g").attr("class","x axis").attr("transform","translate(0,"+height*cen+")").call(xAxis).append("text").attr("class","label").attr("x",width).attr("y",1).style("text-anchor","end").text("Index k"),i.append("g").attr("class","y axis").call(yAxis).append("text").attr("class","label").attr("transform","rotate(-90)").attr("y",6).attr("dy",".71em").style("text-anchor","end").text("Coefficient x[k]"),i.selectAll(".dot").data(s).enter().append("circle").attr("class","dot").attr("r",3.5).attr("cx",xMap).attr("cy",yMap||0).style("fill",function(){return"steelblue"}).on("mouseover",function(t){l.transition().duration(200).style("opacity",.9),l.html("x["+t+"] = "+r[t].toFixed(2)).style("left",d3.event.pageX+5+"px").style("top",d3.event.pageY-28+"px")}).on("mouseout",function(){l.transition().duration(500).style("opacity",0)})}function _blDistStemSetup(t){var e=null,r=null,s=!1,a=!1;t.ref.c.once("value",function(t){e=t.val(),s=!0}),t.ref.d.once("value",function(t){r=t.val(),a=!0});setTimeout(function(){if(s&&a){if(1==t.readout.readoutType)for(var n=new Array(r.length),m=0;m<n.length;m++)n[m]=t.readout.ccoeff*e[m]+t.readout.dcoeff*r[m];else if(2==t.readout.readoutType)var n=blDECODEL1DistSetupPlot(e,r);else if(3==t.readout.readoutType)var n=blLPineqDistSetupPlot(e,r);else for(var n=new Array(r.length),m=0;m<n.length;m++)n[m]=0;_blDistStem(n)}else _blDistStemSetup(t)},100)}function _blDistStem(t){$("#myDistPlot").empty(),$("#myDistPlot").css("height","200"),$(".tooltip").remove();var e={top:10,right:20,bottom:20,left:30};width=$("#plotEnvDist").width()-e.left-e.right,height=200-e.top-e.bottom;for(var r=new Array(t.length),s=0;s<t.length;s++)r[s]=s;var a=function(t){return t};xScale=d3.scale.linear().range([0,width]),xMap=function(t){return xScale(a(t))},xAxis=d3.svg.axis().scale(xScale).orient("bottom");var n=function(t){return t};yScale=d3.scale.linear().range([height,0]),yMap=function(e){return yScale(n(t[e]))},yAxis=d3.svg.axis().scale(yScale).orient("left");var m=(d3.select("#myDistPlot").attr("width",width+e.left+e.right).attr("height",height),d3.select("#myDistPlot").append("svg").attr("width",width+e.left+e.right).attr("height",height+e.top+e.bottom).append("g").attr("transform","translate("+e.left+","+e.top+")")),i=d3.select("body").append("div").attr("class","tooltip").attr("id","tooltipID").style("opacity",0);xScale.domain([0,t.length]),mx=Math.max(d3.max(t)+1,0),mn=Math.min(d3.min(t)-1,0),cen=mx/(mx-mn),yScale.domain([mn,mx]),m.append("g").attr("class","x axis").attr("transform","translate(0,"+height*cen+")").call(xAxis).append("text").attr("class","label").attr("x",width).attr("y",1).style("text-anchor","end").text("Index k"),m.append("g").attr("class","y axis").call(yAxis).append("text").attr("class","label").attr("transform","rotate(-90)").attr("y",6).attr("dy",".71em").style("text-anchor","end").text("Coefficient x[k]"),m.selectAll(".dot").data(r).enter().append("circle").attr("class","dot").attr("r",3.5).attr("cx",xMap).attr("cy",yMap||0).style("fill",function(){return"steelblue"}).on("mouseover",function(e){i.transition().duration(200).style("opacity",.9),i.html("x["+e+"] = "+t[e].toFixed(2)).style("left",d3.event.pageX+5+"px").style("top",d3.event.pageY-28+"px")}).on("mouseout",function(){i.transition().duration(500).style("opacity",0)})}function _blDistComputeSetup(t){var e=null,r=!1;t.ref.computeHist.once("value",function(s){var a=s.val();if(a){var n=Object.keys(a);e=new Array(n.length);for(var m=0;m<n.length;m++)e[m]=+a[n[m]]||0;r=!0}else setTimeout(function(){_blDistComputeSetup(t)},100)});setTimeout(function(){r?_blDistCompute(e):_blDistComputeSetup(t)},100)}function _blDistCompute(t){$("#computeSVG").empty(),$("#computeSVG").css("height","200"),$(".tooltip").remove();var e={top:10,right:20,bottom:20,left:50};width=$("#computeID").width()-e.left-e.right,height=200-e.top-e.bottom;for(var r=new Array(t.length),s=0;s<t.length;s++)r[s]=s;var a=function(t){return t};xScale=d3.scale.linear().range([0,width]),xMap=function(t){return xScale(a(t))},xAxis=d3.svg.axis().scale(xScale).orient("bottom");var n=function(t){return t};yScale=d3.scale.linear().range([height,0]),yMap=function(e){return parseFloat(yScale(n(t[e])))},yAxis=d3.svg.axis().scale(yScale).orient("left");var m=(d3.select("#computeSVG").attr("width",width+e.left+e.right).attr("height",height),d3.select("#computeSVG").append("svg").attr("width",width+e.left+e.right).attr("height",height+e.top+e.bottom).append("g").attr("transform","translate("+e.left+","+e.top+")")),i=d3.select("body").append("div").attr("class","tooltip").attr("id","tooltipID").style("opacity",0);xScale.domain([0,t.length-1]),yScale.domain([0,d3.max(t)+.5]),m.append("g").attr("class","x axis").attr("transform","translate(0,"+.97*height+")").call(xAxis).append("text").attr("class","label").attr("x",width).attr("y",1).style("text-anchor","end").text(""),m.append("g").attr("class","y axis").call(yAxis).append("text").attr("class","label").attr("transform","rotate(-90)").attr("y",6).attr("dy",".71em").style("text-anchor","end").text("Equivalent Iteration"),m.append("text").attr("x",width/2).attr("y",.1).attr("text-anchor","middle").text("Compute Per Worker"),m.selectAll(".dot").data(r).enter().append("circle").attr("class","dot").attr("r",3.5).attr("cx",xMap||0).attr("cy",yMap||0).style("fill",function(){return"steelblue"}).on("mouseover",function(e){i.transition().duration(200).style("opacity",.9),i.html("x["+e+"] = "+t[e].toFixed(2)).style("left",d3.event.pageX+5+"px").style("top",d3.event.pageY-28+"px")}).on("mouseout",function(){i.transition().duration(500).style("opacity",0)})}function _blDistComputeResourceSetup(t){var e=null,r=!1;t.ref.active.once("value",function(t){var s=t.val();if(s){var a=Object.keys(s);e=new Array(a.length);for(var n=0;n<a.length;n++)e[n]=s[a[n]];var m={};$.each(e,function(){var t=this;m[t]=m[t]+1||1}),data=[],countKeys=Object.keys(m);for(var n=0;n<countKeys.length;n++)data.push({label:countKeys[n],value:m[countKeys[n]]});r=!0}});setTimeout(function(){r?_blDistComputeResources(data):_blDistComputeResourceSetup(t)},50)}function _blDistComputeResources(t){$("#resourcesSVG").empty();var e=Math.min($("#resourcesID").width(),$("#resourcesID").height()),r=e,s=e/2;color=d3.scale.category20c();var a=d3.select("#resourcesSVG").append("svg:svg").data([t]).attr("width",e).attr("height",r).append("svg:g").attr("transform","translate("+s+","+s+")"),n=d3.svg.arc().outerRadius(s),m=d3.layout.pie().value(function(t){return t.value}),i=a.selectAll("g.slice").data(m).enter().append("svg:g").attr("class","slice");i.append("svg:path").attr("fill",function(t,e){return color(e)}).attr("d",n),i.append("svg:text").attr("transform",function(t){return t.innerRadius=0,t.outerRadius=s,"translate("+n.centroid(t)+")"}).attr("text-anchor","middle").text(function(e,r){return t[r].label})}function _blUpdateIterationCount(t){t.ref.computeHist.once("value",function(t){var e=t.val();if(e){for(var r=Object.keys(e),s=0,a=0;a<r.length;a++)s+=e[r[a]];document.getElementById("numIterDistID1").innerHTML=parseFloat(s).toFixed(2),document.getElementById("numIterDistID2").innerHTML=parseFloat(s).toFixed(2)}else document.getElementById("numIterDistID1").innerHTML="0.00",document.getElementById("numIterDistID2").innerHTML="0.00"})}function _blReduce2x2(t,e,r,s,a,n){if(system={},system.Q11=numeric.getBlock(e,[0,0],[a-1,n-1]),system.Q12=numeric.getBlock(e,[0,n],[a-1,e.length-1]),system.Q21=numeric.getBlock(e,[a,0],[e.length-1,n-1]),system.Q22=numeric.getBlock(e,[a,n],[e.length-1,e.length-1]),1==t){var m=numeric.inv(numeric.sub(_blEye(r.length),numeric.dot(r,system.Q11)));system.G=numeric.add(system.Q22,numeric.dot(numeric.dot(numeric.dot(system.Q21,m),r),system.Q12)),system.dInit=numeric.dot(numeric.dot(system.Q21,m),s)}else{var m=numeric.inv(numeric.sub(_blEye(r.length),numeric.dot(r,system.Q22)));system.G=numeric.add(system.Q11,numeric.dot(numeric.dot(numeric.dot(system.Q12,m),r),system.Q21)),system.dInit=numeric.dot(numeric.dot(system.Q12,m),s)}return system}function _blSparseVec(t,e,r,s){for(var a=new Array(t),n=0;t>n;n++)a[n]=0;for(n=0;e>n;n++)a[_blRandInt(0,t-1)]=_blRandInt(r,s);return a}function _blRandInt(t,e){return Math.floor(Math.random()*(e-t+1))+t}function _blRandMat(t,e){for(var r=new Array(t),s=0;t>s;s++){r[s]=new Array(e);for(var a=0;e>a;a++)r[s][a]=_blNormal()}return r}function _blRandMatInt(t,e){for(var r=new Array(t),s=0;t>s;s++){r[s]=new Array(e);for(var a=0;e>a;a++)r[s][a]=_blRandInt(-20,0)}return r}function _blNormal(){var t,e;do{t=2*Math.random()-1,e=2*Math.random()-1;var r=t*t+e*e}while(0==r||r>1);return t*Math.sqrt(-2*Math.log(r)/r)}function _blZeros(t,e){for(var r=new Array(t),s=0;t>s;s++){r[s]=new Array(e);for(var a=0;e>a;a++)r[s][a]=0}return r}function _blEye(t){return numeric.diag(Array.apply(null,new Array(t)).map(Number.prototype.valueOf,1))}function _blA2Q(t){var e=t.length,r=t[0].length,s=numeric.add(_blEye(r+e),numeric.transpose(numeric.transpose(_blZeros(r,r).concat(t)).concat(numeric.transpose(numeric.transpose(numeric.mul(t,-1)).concat(_blZeros(e,e)))))),a=numeric.transpose(numeric.transpose(numeric.inv(numeric.add(_blEye(r),numeric.dot(numeric.transpose(t),t))).concat(_blZeros(e,r))).concat(numeric.transpose(_blZeros(r,e).concat(numeric.inv(numeric.add(_blEye(e),numeric.dot(t,numeric.transpose(t))))))));return numeric.dot(numeric.dot(s,s),a)}