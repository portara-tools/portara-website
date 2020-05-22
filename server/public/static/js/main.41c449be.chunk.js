(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{64:function(e,a,t){e.exports=t(75)},75:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),i=t(14),l=t.n(i),o=t(95),c=t(96),s=t(58),m=Object(s.a)({palette:{type:"dark",primary:{main:"#ffffff"},background:{default:"#000000"}}}),p=t(97),u=t(100),d=t(98),g=t(92),E=t(50),x=t.n(E),f=t(93),y=t(31),h=function(e){var a=b(e);return n.createElement(n.Fragment,null,n.createElement(p.a,{className:a.container},n.createElement(u.a,{position:"static",className:a.appBar},n.createElement("ul",{className:a.linksUL},n.createElement(d.a,null,n.createElement(y.b,{to:"/",className:a.linkStyle},"HOME")),n.createElement(d.a,null,n.createElement(y.b,{to:"/about",className:a.linkStyle},"ABOUT"))),n.createElement("ul",{className:a.loginButton},n.createElement(g.a,{variant:"overline",underline:"none"},n.createElement(d.a,{variant:"outlined",size:"small"},"SIGN IN WITH",n.createElement(x.a,{style:{fontSize:"large",marginLeft:"8px"}})))))))},b=Object(f.a)((function(){return{appBar:{flexDirection:"row",backgroundColor:"black",justifyContent:"space-between"},container:{backgroundColor:"black",padding:"25px",margin:"0 10%"},linksUL:{display:"flex",padding:0},linkStyle:{textDecoration:"none",color:"white",hoverOpacity:"0.8",padding:"5px"},loginButton:{display:"flex",alignItems:"center",margin:"0px",padding:"0px","&:hover":{color:"#7209b7",backgroundColor:"black"}}}})),v=t(94),N=t(79),w=t(99),q=t(80),k=t(59),B=t(26),C=function(e,a){return[-(a-window.innerHeight/2)/20,(e-window.innerWidth/2)/20,1.1]},R=function(e,a,t){return"perspective(600px) rotateX(".concat(e,"deg) rotateY(").concat(a,"deg) scale(").concat(t,")")};function S(e){var a=e.children,t=Object(B.b)((function(){return{xys:[0,0,1],config:{mass:5,tension:350,friction:40}}})),n=Object(k.a)(t,2),i=n[0],l=n[1];return r.a.createElement(B.a.div,{className:"card",onMouseMove:function(e){var a=e.clientX,t=e.clientY;return l({xys:C(a,t)})},onMouseLeave:function(){return l({xys:[0,0,1]})},style:{transform:i.xys.interpolate(R)}},a)}var D=t(54),T=t.n(D),W=t(55),j=t.n(W),z=t(56),P=t.n(z),O=t(57),L=t.n(O),I=t(52),H=t.n(I),M=t(51),Q=t.n(M),F=t(53),U=t.n(F);function A(e){var a=e.children,t=Object(B.b)({opacity:1,font:"Roboto",fontSize:"60px",fontWeight:"lighter",color:"white",from:{opacity:0,fontSize:"600px"},config:{duration:500}});return r.a.createElement(B.a.div,{style:t},a)}var J=function(){var e=X();return r.a.createElement(r.a.Fragment,null,r.a.createElement(h,null),r.a.createElement(p.a,{maxWidth:"sm",className:e.container},r.a.createElement(v.a,{className:e.content},r.a.createElement(A,null,"Portara"),r.a.createElement("hr",{style:{width:"100%",marginBottom:"30px"}}),r.a.createElement(N.a,{variant:"h5",color:"primary"},"The best rate limiter that exists"),r.a.createElement(d.a,{className:e.downloadButton,variant:"outlined"},r.a.createElement(g.a,{target:"_blank",href:"https://www.npmjs.com/package/portara",underline:"none"},r.a.createElement(N.a,{color:"primary"},"Download on NPM"))),r.a.createElement(v.a,{className:e.imageWrapper},r.a.createElement(p.a,{className:e.imageContainer},r.a.createElement(S,null,r.a.createElement("img",{src:"/portaraScreenshot2.png",height:"400px"})),r.a.createElement(v.a,{className:e.textWrapper},r.a.createElement(N.a,null,r.a.createElement(Q.a,{style:{fontSize:"small",marginRight:"5px"}}),"Easy to use: decorate at will"),r.a.createElement(N.a,null,r.a.createElement(H.a,{style:{fontSize:"small",marginRight:"5px"}}),"Blocks or slows requests: save money"),r.a.createElement(N.a,null,r.a.createElement(U.a,{style:{fontSize:"small",marginRight:"5px"}}),"Tested & Typescripted"))))),r.a.createElement(v.a,{container:!0,spacing:10},r.a.createElement(v.a,{xs:12,container:!0,item:!0,className:e.cardsWrapper,spacing:5},r.a.createElement(w.a,{in:!0,style:{transitionDelay:"500ms"}},r.a.createElement(v.a,{item:!0,xs:4,className:e.card},r.a.createElement(p.a,{style:{flexDirection:"row",display:"flex"}},r.a.createElement(T.a,{fontSize:"small",style:{marginTop:"3px",marginRight:"10px"}}),r.a.createElement(N.a,{variant:"subtitle1"},"No re-deploying")),r.a.createElement("hr",null),r.a.createElement(N.a,{variant:"caption",gutterBottom:!0},"The ability to alter rate limiter settings through a user account eliminates the need to re-deploy your application"))),r.a.createElement(w.a,{in:!0,style:{transitionDelay:"800ms"}},r.a.createElement(v.a,{item:!0,xs:4,className:e.card},r.a.createElement(p.a,{style:{flexDirection:"row",display:"flex"}},r.a.createElement(j.a,{fontSize:"small",style:{marginTop:"3px",marginRight:"10px"}}),r.a.createElement(N.a,{variant:"subtitle1"},"Easy to use")),r.a.createElement("hr",null),r.a.createElement(N.a,{variant:"caption",gutterBottom:!0},"Thanks to schema directives, Portara gives you a lot of flexibility. It can be as easy as applying a limiter to a single field, or to a combination of fields and objects"))),r.a.createElement(w.a,{in:!0,style:{transitionDelay:"1100ms"}},r.a.createElement(v.a,{item:!0,xs:4,className:e.card},r.a.createElement(p.a,{style:{flexDirection:"row",display:"flex"}},r.a.createElement(P.a,{fontSize:"small",style:{marginTop:"3px",marginRight:"10px"}}),r.a.createElement(N.a,{variant:"subtitle1"},"Safe")),r.a.createElement("hr",null),r.a.createElement(N.a,{variant:"caption",gutterBottom:!0},"Built with TypeScript and thoroughly tested to ensure stability"))))),r.a.createElement(v.a,{xs:12,container:!0,item:!0,className:e.cardsWrapper,spacing:5},r.a.createElement(w.a,{in:!0,style:{transitionDelay:"1700ms"}},r.a.createElement(v.a,{item:!0,xs:4,className:e.card},r.a.createElement(p.a,{style:{flexDirection:"row",display:"flex"}},r.a.createElement(L.a,{fontSize:"small",style:{marginTop:"3px",marginRight:"10px"}}),r.a.createElement(N.a,{variant:"subtitle1"},"Save money")),r.a.createElement("hr",null),r.a.createElement(N.a,{variant:"caption",gutterBottom:!0},"Prevent malicious entities from causing server overload or rate spikes in services like AWS"))))),r.a.createElement("br",null),r.a.createElement(p.a,{maxWidth:"sm",className:e.gradientContainer}))},X=Object(q.a)((function(){return{container:{backgroundSize:"contain",padding:"25px",margin:"0 10%"},gradientContainer:{background:"linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(0,0,0,1) 100%)",padding:"25px",margin:"0px",marginRight:"0px"},content:{display:"flex",flexDirection:"column",alignItems:"center"},downloadButton:{marginTop:"20px"},cardsWrapper:{spacing:"8",display:"flex"},imageWrapper:{spacing:"8",display:"flex",justifyContent:"space-between"},imageContainer:{display:"flex",flexDirection:"row",justifyContent:"space-between"},textWrapper:{marginTop:"50px",marginBottom:"50px",display:"flex",flexDirection:"column",justifyContent:"space-around",alignItems:"center"},cardsContainer:{display:"flex",flexDirection:"row",justifyContent:"space-around",flexWrap:"wrap",marginTop:"10px"},card:{height:"150px"},upperSplit:{borderTopLeftRadius:"10px",borderTopRightRadius:"10px",borderBottomRightRadius:"30px",padding:"10px",width:"100%",height:"60%",background:"linear-gradient(197deg, rgba(114,111,156,1) 0%, rgba(58,80,107,1) 65%, rgba(58,80,107,1) 100%)"}}})),Y=Object(f.a)((function(){return{container:{backgroundSize:"contain",padding:"25px",margin:"0 10%"},peopleContainer:{},personCard:{display:"flex",flexDirection:"row",marginBottom:"10px",width:"90%"},infoBox:{display:"flex",flexDirection:"column"}}})),G=function(e){var a=Y(e);return r.a.createElement(r.a.Fragment,null,r.a.createElement(h,null),r.a.createElement(A,null,"team potato"),r.a.createElement(p.a,{maxWidth:"sm",className:a.container},r.a.createElement(v.a,{container:!0,spacing:6,className:a.peopleContainer},r.a.createElement(v.a,{item:!0,xs:6,className:a.personCard},r.a.createElement("img",{alt:"Peve",src:"/a.png",style:{height:"175px",marginRight:"15px",borderRadius:"10%"}}),r.a.createElement(p.a,{className:a.infoBox},r.a.createElement(N.a,{variant:"h5"},"Peve"),r.a.createElement(N.a,{variant:"body2"},"Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui placeat rerum temporibus veniam sequi! Hic quos, dicta alias corrupti atque aliquid sed, facere quasi quibusdam non consequuntur magni error. Dolorem."))),r.a.createElement(v.a,{item:!0,xs:6,className:a.personCard},r.a.createElement("img",{alt:"Podd",src:"/b.png",style:{height:"175px",marginRight:"15px",marginTop:"5px",borderRadius:"10%"}}),r.a.createElement(p.a,{className:a.infoBox},r.a.createElement(N.a,{variant:"h5"},"Podd"),r.a.createElement(N.a,{variant:"body2"},"Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui placeat rerum temporibus veniam sequi! Hic quos, dicta alias corrupti atque aliquid sed, facere quasi quibusdam non consequuntur magni error. Dolorem.")))),r.a.createElement(v.a,{container:!0,spacing:6,className:a.peopleContainer},r.a.createElement(v.a,{item:!0,xs:6,className:a.personCard},r.a.createElement("img",{alt:"Pary",src:"/c.png",style:{height:"175px",marginRight:"15px",borderRadius:"10%"}}),r.a.createElement(p.a,{className:a.infoBox},r.a.createElement(N.a,{variant:"h5"},"Pary"),r.a.createElement(N.a,{variant:"body2"},"Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui placeat rerum temporibus veniam sequi! Hic quos, dicta alias corrupti atque aliquid sed, facere quasi quibusdam non consequuntur magni error. Dolorem."))),r.a.createElement(v.a,{item:!0,xs:6,className:a.personCard},r.a.createElement("img",{alt:"Palex",src:"/d.png",style:{height:"175px",marginRight:"15px",marginTop:"5px",borderRadius:"10%"}}),r.a.createElement(p.a,{className:a.infoBox},r.a.createElement(N.a,{variant:"h5"},"Palex"),r.a.createElement(N.a,{variant:"body2"},"Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui placeat rerum temporibus veniam sequi! Hic quos, dicta alias corrupti atque aliquid sed, facere quasi quibusdam non consequuntur magni error. Dolorem."))))))},_=t(6);var K=function(){return r.a.createElement("div",{style:{backgroundColor:"black"}},r.a.createElement(y.a,null,r.a.createElement(_.a,null,r.a.createElement(_.c,null,r.a.createElement(_.a,{exact:!0,path:"/",component:J}),r.a.createElement(_.a,{exact:!0,path:"/about",component:G})))))};l.a.render(r.a.createElement(o.a,{theme:m},r.a.createElement(c.a,null,r.a.createElement(K,null))),document.getElementById("root"))}},[[64,1,2]]]);
//# sourceMappingURL=main.41c449be.chunk.js.map