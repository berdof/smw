var Cackle=Cackle||{};
(function(){var H=location.protocol;
var E=H+"//cackle.me";
var A="6db6181cc3cf+";
function I(){var J=document.createElement("img");
J.setAttribute("src",E+"/static/img/comment-wait.gif");
document.getElementById("mc-container").appendChild(J)
}function G(N,M,L,K){var J=N%10;
if((J==1)&&((N==1)||(N>20))){return N+" "+M
}else{if((J>1)&&(J<5)&&((N>20)||(N<10))){return N+" "+L
}else{return N+" "+K
}}}function C(n){I();
n(document).unbind(".cackle");
var i={google:{name:"Google",url:E+"/j_spring_openid_security_check?openid_identifier=https://www.google.com/accounts/o8/id"},googleplus:{name:"Google+",url:E+"/signin/googleplus/proxy?scope=https://www.googleapis.com/auth/userinfo.profile%20https://www.googleapis.com/auth/userinfo.email"},yahoo:{name:"Yahoo",url:E+"/j_spring_openid_security_check?openid_identifier=http://me.yahoo.com/"},yandex:{name:"Яндекс",url:E+"/j_spring_openid_security_check?openid_identifier=http://openid.yandex.ru"},vkontakte:{name:"Вконтакте",url:E+"/signin/vkontakte/proxy?scope=wall,offline,notify"},facebook:{name:"Facebook",url:E+"/signin/facebook/proxy?scope=email,status_update,offline_access"},twitter:{name:"Twitter",url:E+"/signin/twitter/proxy"},linkedin:{name:"Linkedin",url:E+"/signin/linkedin/proxy"},mymailru:{name:"Мой Мир@Mail.Ru",url:E+"/signin/mymailru/proxy?scope=stream"},odnoklassniki:{name:"Одноклассники",url:E+"/signin/odnoklassniki/proxy?scope=VALUABLE%20ACCESS"},mailru:{name:"Mail.Ru",label:"Введите ваше имя пользователя на Mail.ru",url:E+"/j_spring_openid_security_check?openid_identifier=http://{username}.id.mail.ru/&openid_username={username}"},rambler:{name:"Рамблер",label:"Введите ваше имя пользователя на Рамблер",url:E+"/j_spring_openid_security_check?openid_identifier=http://id.rambler.ru/users/{username}&openid_username={username}"},myopenid:{name:"MyOpenID",label:"Введите ваше имя пользователя на MyOpenID",url:E+"/j_spring_openid_security_check?openid_identifier=http://{username}.myopenid.com/&openid_username={username}"},livejournal:{name:"Живой Журнал",label:"Введите ваше имя в Живом Журнале",url:E+"/j_spring_openid_security_check?openid_identifier=http://{username}.livejournal.com/&openid_username={username}"},flickr:{name:"Flickr",label:"Введите ваше имя на Flickr",url:E+"/j_spring_openid_security_check?openid_identifier=http://flickr.com/{username}/&openid_username={username}"},wordpress:{name:"Wordpress",label:"Введите ваше имя на Wordpress.com",url:E+"/j_spring_openid_security_check?openid_identifier=http://{username}.wordpress.com/&openid_username={username}"},blogger:{name:"Blogger",label:"Ваш Blogger аккаунт",url:E+"/j_spring_openid_security_check?openid_identifier=http://{username}.blogspot.com/&openid_username={username}"},verisign:{name:"Verisign",label:"Ваше имя пользователя на Verisign",url:E+"/j_spring_openid_security_check?openid_identifier=http://{username}.pip.verisignlabs.com/&openid_username={username}"}};
var q=null;
var Q="";
var k="32";
var c=null;
var V=true;
var w=true;
var d=true;
var X=0;
var Z=(typeof mcLocale!="undefined")?"&locale="+mcLocale:"";
var j={};
var e="";
var u=(typeof mcNoCss!="undefined")?mcNoCss:false;
var a="";
var f="";
var O="";
var l=false;
var r="standard";
var o=true;
var J;
var R;
var g=(typeof mcCallback!="undefined")?mcCallback:null;
var K=i;
var v={xPostProviders:{vkontakte:true,mymailru:true,facebook:true,twitter:true},content:"",init:function(){this.content=n("<div/>").addClass("mc-cleanslate").addClass("mc-content");
if(!u){this.loadCss()
}this.loadHtml();
n(".mc-postbox-container textarea",this.content).bind("keyup",s.textareaAutoResize);
n(".mc-user-logout",this.content).click(function(){p.logoutWindow()
})
},loadCss:function(){var x=n("<link>",{rel:"stylesheet",type:"text/css",href:E+"/static/css/comment-min.css?v="+A});
x.appendTo("head")
},loadHtml:function(){var x;
if(typeof mcWidgetHtml!="undefined"){x=mcWidgetHtml
}else{x='<style type="text/css">${mcCss}</style><div class="mc-auth-container"><span class="mc-auth-label">${msg.from}</span><div class="mc-auth-providers"></div></div><div class="mc-widget-container"><div class="mc-avatar-container"><img class="mc-avatar-img" src="${mcAnonymAvatar}" height="36" width="36"><span class="mc-user-logout">${msg.logout}</span></div><div class="mc-postbox-container"><div class="mc-editor"><div class="mc-editor-wrapper"><div class="mc-editor-message"><textarea placeholder="${msg.placeholder}"></textarea><div class="mc-editor-controls"><div class="mc-spinner-control" style="display:none"></div><div class="mc-attachmedia-control" title="${msg.media}"></div></div></div><div class="mc-editor-media"><textarea placeholder="${msg.mediaPlaceholder}"></textarea><div class="mc-editor-controls"><button class="mc-button mc-addmedia-control">${msg.add}</button></div></div></div></div><div class="mc-submit"><span class="mc-social-xpost"><table><tbody><tr><td><input class="mc-social-xpost-checkbox" type="checkbox"/></td><td><label>${msg.socialSubmit}</label></td><td><span class="mc-social-xpost-icon"></span></td></tr></tbody></table></span><button class="mc-button mc-comment-submit">${msg.submit}</button></div><div class="mc-info"><h4>${msg.commentCount}: <span class="mc-comment-count">0</span></h4></div></div><div class="mc-theme-${mcTheme}"><ul class="mc-comment-list"></ul></div><div class="mc-pagination"><button class="mc-button mc-comment-next" title="0">${msg.nextComments}</button></div></div>'
}this.content.html(h.template(x,{mcCss:a,mcAnonymAvatar:e,mcTheme:r}));
if(c){this.content.prepend(n("<h3></h3>").text(c))
}n("#mc-container").html(this.content);
this.buildCopyright();
this.buildAuthProviders();
this.buildLoggedUser(j);
this.initSocialXPost()
},buildCopyright:function(){var y=n("#mc-link");
if(!l&&(y.length==0||!y.is(":visible")||y.text()==="")){var x='<h6 class="mc-copyright"';
if(o===true){x+=' style="display:inline-block!important;"'
}x+='>powered by <a href="http://cackle.me"><b style="color:#4FA3DA!important">CACKL</b><b style="color:#F65077!important">E</b></a></h6>';
n(".mc-info",this.content).append(x)
}},buildAuthProviders:function(){var x=n(".mc-auth-providers",this.content);
if(typeof mcSSOProvider!="undefined"){this.buildSSOProvider(x)
}n.each(Q.split(";"),function(y,z){if(K[z]){n(x).each(function(){n(this).append('<span class="mc-auth-provider mc-auth-'+z+'" title="'+K[z].name+'"/>')
})
}})
},buildSSOProvider:function(x){n(x).each(function(){var z=n('<span class="mc-sso-provider" title="'+mcSSOProvider.name+'"/>'),y=n('<img src="'+mcSSOProvider.logo+'"></img>');
z.append(y);
if(mcSSOProvider.width){z.css("width",mcSSOProvider.width);
y.css("width",mcSSOProvider.width)
}if(mcSSOProvider.height){z.css("height",mcSSOProvider.height);
y.css("height",mcSSOProvider.height)
}z.click(function(){p.loginWindow(mcSSOProvider.url,true)
});
n(this).append(z)
})
},buildLoggedUser:function(y){var x=n(".mc-avatar-container img",this.content);
if(y.id){x.attr("src",this.buildAvatarSrc(y,x.height()));
if(this.xPostProviders[y.provider]){this.showSocialXPost(y.provider)
}else{this.hideSocialXPost()
}n(".mc-user-logout",this.content).show()
}else{x.attr("src",this.buildAvatarSrc({avatar:e,id:y.id},x.height()));
n(".mc-user-logout",this.content).hide();
n(".mc-social-xpost",this.content).hide()
}},buildAvatarSrc:function(x,y){var z,AA=y||k;
if(!x.avatar){if(w&&x.hash&&x.provider!="guest"){z="http://gravatar.com/avatar/"+x.hash+"?d=wavatar&r=PG&s="+AA
}else{z=e
}}else{z=x.avatar
}return z
},buildWaitAvatar:function(){n(".mc-avatar-container img",this.content).attr("src",E+"/static/img/load-avatar.gif")
},showWaitComment:function(){n(".mc-info",this.content).append('<div class="mc-comment-wait"><img src="'+E+'/static/img/comment-wait.gif"/></div>')
},removeWaitComment:function(){n(".mc-info .mc-comment-wait",this.content).remove()
},initSocialXPost:function(){var x=this;
n(".mc-social-xpost-checkbox",this.content).click(function(){var z=n(".mc-social-xpost-icon",x.content),y=x.getSocialXPostProvider(z.attr("class"));
if(n(this).is(":checked")){m.create(y,"on",365)
}else{m.create(y,"off",365)
}})
},getSocialXPostProvider:function(y){var x="";
n.each(y.split(" "),function(z,AA){if(AA!="mc-social-xpost-icon"){x=AA;
return 
}});
return x
},showSocialXPost:function(AB){var x=m.read("mc-xpost-"+AB),AA=n(".mc-social-xpost-checkbox",this.content),y=n(".mc-social-xpost-icon",this.content),z=n(".mc-social-xpost",this.content);
if((d==false&&x!="on")||x=="off"){AA.removeAttr("checked")
}else{AA.attr("checked","checked")
}y.attr("class","mc-social-xpost-icon mc-xpost-"+AB);
y.attr("title",AB);
z.css("display","inline-block")
},hideSocialXPost:function(){n(".mc-social-xpost",this.content).css("display","none")
},setCommentCount:function(x){n(".mc-comment-count",this.content).text(x)
},upCommentCount:function(){var x=n(".mc-comment-count",this.content);
x.text(parseInt(x.text())+1)
}};
var b={TEMPL:"",liCache:{},init:function(){if(typeof mcCommentsHtml!="undefined"){this.TEMPL=mcCommentsHtml
}else{if(r==="standard"){this.TEMPL='<li id="mc-${id}"><div class="mc-comment-wrapper mc-comment-${status}"><div class="mc-comment-head"><table><tbody><tr><td class="mc-comment-avatar-td"><a class="mc-comment-author" href="#"><img class="mc-avatar-img" src="${avatar}" style="height:${avatarSize}px!important;width:${avatarSize}px!important"><span class="mc-comment-provider mc-${provider}"></span></a></td><td class="mc-comment-user-td"><a class="mc-comment-username" href="${userWww}" author="${userId}" target="_blank">${userName}</a></td><td class="mc-comment-vote-td"><div class="mc-comment-vote"><table><tbody><tr><td class="mc-comment-rating mc-comment-rating-${ratingColor}" title="${msg.rating}">${rating}</td><td class="mc-comment-like"><a class="mc-comment-thumbsup" href="${likeUrl}" title="${msg.ratingUp}"><span></span></a></td><td class="mc-comment-unlike"><a class="mc-comment-thumbsdown" href="${unlikeUrl}" title="${msg.ratingDown}"><span></span></a></td></tr></tbody></table></div></td></tr></tbody></table></div><div class="mc-comment-body">${message}</div><div class="mc-comment-footer"><a class="mc-comment-created" href="${url}" timestamp="${timestamp}">${created}</a><a class="mc-comment-edit" href="#">${msg.edit}</a><a class="mc-comment-remove" href="#">${msg.remove}</a><span class="mc-comment-moderate"><a href="#">${msg.moderate}</a></span><a class="mc-comment-reply" href="#">${msg.answer}</a></div></div></li>'
}else{this.TEMPL='<li id="mc-${id}"><div class="mc-comment-user"><a class="mc-comment-author" href="#"><img class="mc-avatar-img" src="${avatar}" style="height:${avatarSize}px!important;width:${avatarSize}px!important"></a></div><div class="mc-comment-wrapper mc-comment-${status}"><div class="mc-comment-head"><a class="mc-comment-username" href="${userWww}" author="${userId}" target="_blank">${userName}</a><span class="mc-comment-bullet"> • </span><a class="mc-comment-created" href="${url}" timestamp="${timestamp}">${created}</a></div><div class="mc-comment-body">${message}</div><div class="mc-comment-footer"><span class="mc-comment-rating mc-comment-rating-${ratingColor}" title="${msg.rating}">${rating}</span><a class="mc-comment-thumbsup" href="${likeUrl}" title="${msg.ratingUp}"><span></span></a><span class="mc-comment-bullet"> • </span><a class="mc-comment-reply" href="#">${msg.answer}</a><span class="mc-comment-bullet"> • </span><a class="mc-comment-edit" href="#">${msg.edit}<span class="mc-comment-bullet"> • </span></a><a class="mc-comment-remove" href="#">${msg.remove}<span class="mc-comment-bullet"> • </span></a><span class="mc-share-container"><a href="#">${msg.share}</a><span class="mc-share-icons"><span class="mc-twitter"></span><span class="mc-facebook"></span><span class="mc-googleplus"></span><span class="mc-vkontakte"></span><span class="mc-odnoklassniki"></span><span class="mc-mymailru"></span></span></span><span class="mc-comment-moderate"><a href="#">${msg.moderate}</a></span></div></div></li>';
n(".mc-share-container").live("mouseover.cackle",function(){n(".mc-share-icons",this).css("display","inline-block")
});
n(".mc-share-container").live("mouseout.cackle",function(){n(".mc-share-icons",this).hide()
});
n(".mc-share-icons span").live("click.cackle",function(){var AC=n(this),AA=AC.attr("class").replace("mc-",""),AE=AC.parents("li"),x=AC.parents(".mc-comment-wrapper"),y=n(".mc-comment-created",x).attr("href"),AD=n(".mc-comment-username",x).text(),AF=n(".mc-comment-body",x).text();
var AB,z=n(".mc-comment-media a:first",x);
if(z.length>0){AB=z.attr("href")
}else{AB=n(".mc-comment-author img",AE).attr("src")
}P[AA]({url:y,title:AD,text:AF,img:AB})
})
}}},findParent:function(AC,z){var x,AB="#mc-"+AC,y;
if(this.liCache[AB]){x=this.liCache[AB]
}else{x=n("#mc-"+AC);
this.liCache[AB]=x
}if(z=="approved"&&x.is(":hidden")){x.show();
n(x.parents("li")).each(function(){n(this).show()
})
}var AA=n(x.children("ul.mc-comment-child"));
if(AA.length){y=AA
}else{y=n("<ul/>").addClass("mc-comment-child");
x.append(y)
}return y
},prepareData:function(AC){var z=AC.author,y=AC.anonym,AE,AD,AG,AA="",AF="",AH="zero",x=AC.rating,AI=n("<div/>");
if(z){AD=z.id;
AG=z.name;
AF=z.provider;
if(z.www){if(z.www.match("^https?://")){AA=z.www
}else{AA="http://"+z.www
}}if(!z.avatar){if(w&&z.hash){AE="http://gravatar.com/avatar/"+z.hash+"?d=wavatar&r=PG&s="+k
}else{AE=e
}}else{AE=z.avatar
}}else{if(y){AD=y.id;
AG=y.name;
AE=e;
if(y.www){if(y.www.match("^https?://")){AA=y.www
}else{AA="http://"+y.www
}}}else{AD=0;
AG="";
AE=e
}}if(AG){var AB=n("<div/>");
AB.text(AG);
AG=AB.html()
}if(x>0){x="+"+x;
AH="plus"
}else{if(x<0){AH="neg"
}}if(AC.message){AI.text(AC.message)
}else{AI.text(q["comment-"+AC.status])
}if(V){html=AI.html();
AI.html(s.replaceURLWithHTMLLinks(html))
}return{avatar:AE,userId:AD,userName:AG||q.guest,userWww:AA||"#",provider:AF,ratingColor:AH,rating:x,message:AI.html()}
},buildCommentUrl:function(y){var x=s.getBeforeAnchor(window.location.href);
return x+"#mc-"+y
},appendComment:function(AC,AG){if(n("#mc-"+AC.id).length>0){return 
}var x=0,y=n(".mc-comment-list",v.content);
if(AC.parentId>0){y=this.findParent(AC.parentId,AC.status);
x=y.parents("li").length
}var AF=this.prepareData(AC),AE=h.template(this.TEMPL,{id:AC.id,status:AC.status,avatar:AF.avatar,userId:AF.userId,userName:AF.userName,userWww:AF.userWww,avatarSize:k,provider:AF.provider,ratingColor:AF.ratingColor,rating:AF.rating,likeUrl:E+"/comment/"+AC.id+"/vote/up",unlikeUrl:E+"/comment/"+AC.id+"/vote/down",message:AF.message,url:this.buildCommentUrl(AC.id),created:s.getTimeAgo(AC.created,q),timestamp:AC.created}),AD=n(AE),AB=n(".mc-comment-body",AD),z=n(".mc-comment-footer",AD);
n(".mc-comment-reply",AD).click({handler:t},t.replyShow);
if(AC.message||AC.media){AB.after(S.makeContent(AC.message+" "+AC.media))
}if(X>0&&x>=X&&AC.status==="approved"){n(".mc-comment-reply, .mc-comment-bullet:first",z).remove()
}this.updateUserBtnsState(AF.userId,AC.created,AD);
var AA=n(".mc-comment-moderate a",z);
U.bind(AA);
if(AG){AD.hide();
y.prepend(AD);
AD.slideDown("slow")
}else{if(!j.paidAccount&&AC.status!="approved"){AD.hide()
}y.append(AD)
}},updateAppearance:function(){var x=this;
n(".mc-comment-list .mc-comment-wrapper",v.content).each(function(){var AB=n(".mc-comment-created",this),AA=parseInt(AB.attr("timestamp")),z=s.getTimeAgo(AA,q);
AB.text(z);
var y=parseInt(n(".mc-comment-username",this).attr("author"));
x.updateUserBtnsState(y,AA,this)
})
},updateUserBtnsState:function(y,z,x){this.updateUserBtnState(J,".mc-comment-edit",y,z,x);
this.updateUserBtnState(R,".mc-comment-remove",y,z,x)
},updateUserBtnState:function(AA,AB,z,AC,x){if(AA==null&&j.id===z){n(AB,x).show()
}else{if(AA==0||j.id!=z){n(AB,x).hide()
}else{if(AA>0&&j.id===z){var y=new Date().getTime();
if(AC+(AA*60*1000)<y){n(AB,x).hide()
}else{n(AB,x).show()
}}else{n(AB,x).hide()
}}}},changeMessage:function(y,AA){var z=n("<div/>"),x=n("#mc-"+y+" .mc-comment-body:first");
z.text(AA);
if(V){html=z.html();
z.html(s.replaceURLWithHTMLLinks(html))
}x.html(z.html());
if(AA){x.after(S.makeContent(AA))
}},changeRating:function(z,AA){var x=n("#mc-"+z+" .mc-comment-rating:first"),y="mc-comment-rating-zero";
if(AA>0){y="mc-comment-rating-plus";
AA="+"+AA
}else{if(AA<0){y="mc-comment-rating-neg"
}}x.attr("class","mc-comment-rating");
x.addClass(y);
x.text(AA)
},changeStatus:function(z,y){var x=n("#mc-"+z);
if(j.paidAccount){var AA=x.children(".mc-comment-wrapper");
AA.attr("class","mc-comment-wrapper mc-comment-"+y)
}else{if(y!="approved"){x.remove()
}}}};
var h={template:function(x,y){return x.replace(/\$\{([\s\S]+?)\}/g,function(z,AA){if(AA.indexOf("msg.")==0){return q[AA.replace("msg.","")]
}return y[AA]
})
}};
var P={vkontakte:function(x){url="http://vkontakte.ru/share.php?";
url+="url="+encodeURIComponent(x.url);
url+="&title="+encodeURIComponent(x.title);
url+="&description="+encodeURIComponent(x.text);
url+="&image="+encodeURIComponent(x.img);
url+="&noparse=true";
this.popup(url)
},odnoklassniki:function(x){url="http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1";
url+="&st.comments="+encodeURIComponent(x.text);
url+="&st._surl="+encodeURIComponent(x.url);
this.popup(url)
},googleplus:function(x){url="https://plus.google.com/share?";
url+="&url="+encodeURIComponent(x.url);
this.popup(url)
},facebook:function(x){url="http://www.facebook.com/sharer.php?s=100";
url+="&p[title]="+encodeURIComponent(x.title);
url+="&p[summary]="+encodeURIComponent(x.text);
url+="&p[url]="+encodeURIComponent(x.url);
url+="&p[images][0]="+encodeURIComponent(x.img);
this.popup(url)
},twitter:function(y){var x=y.title.length+y.url.length+10,z;
if(y.text.length+x>140){z=y.text.substring(0,140-x)+"..."
}else{z=y.text
}url="http://twitter.com/share?";
url+="text="+encodeURIComponent('"'+z+'" - '+y.title);
url+="&url="+encodeURIComponent(y.url);
url+="&counturl="+encodeURIComponent(y.url);
this.popup(url)
},mymailru:function(x){url="http://connect.mail.ru/share?";
url+="url="+encodeURIComponent(x.url);
url+="&title="+encodeURIComponent(x.title);
url+="&description="+encodeURIComponent(x.text);
url+="&imageurl="+encodeURIComponent(x.img);
this.popup(url)
},popup:function(x){window.open(x,"","toolbar=0,status=0,width=626,height=436")
}};
var t={channel:"",url:"",title:"",demoCommentId:100,init:function(){this.initElements();
this.recive(null,this.initListeners);
n(".mc-comment-submit").click({handler:this,postbox:n(".mc-postbox-container")},this.commentSubmit);
n(".mc-comment-thumbsup,.mc-comment-thumbsdown").live("click.cackle",this.vote);
n(".mc-comment-list li div").live("mouseover.cackle",this.showModerateLink);
n(".mc-comment-list li div").live("mouseout.cackle",this.hideModerateLink);
n(".mc-comment-edit").live("click.cackle",this.editComment);
n(".mc-comment-remove").live("click.cackle",this.removeComment);
n(".mc-comment-username").live("click.cackle",function(y){var x=n(y.target);
if(x.attr("href")!="#"){return true
}return false
})
},initElements:function(){this.url=this.getUrl();
this.channel=this.getChannel();
this.title=encodeURIComponent(n("title").text().replace(/(\r\n|\n|\r)/gm,""))
},initListeners:function(x){n(document).mouseup(function(z){var y=n(".mc-comment-moderate");
if(y.has(z.target).length===0){n(".mc-comment-moderate .mc-controls").remove()
}})
},getUrl:function(){var x=window.location.href,y;
if(typeof mcUrl!="undefined"){y=mcUrl
}else{y=s.getBeforeAnchor(x)
}return y
},getChannel:function(){var x=window.location.href,y;
if(typeof mcChannel!="undefined"){y=mcChannel
}else{if(typeof mcUrl!="undefined"){y=s.getBeforeAnchor(mcUrl)
}else{y=s.getBeforeAnchor(x)
}}if(typeof y==="string"&&y.indexOf("https")==0){y=y.replace("https","http")
}return y
},getParentId:function(x){if(x.hasClass("mc-comment-reply-box")){return x.parents("li:first").attr("id").replace("mc-","")
}return 0
},commentSubmit:function(z){var y=z.data.handler,x=z.data.postbox;
if(!j.id){p.authPopup(function(){y.submit(x)
})
}else{y.submit(x)
}return false
},recive:function(z,AA){if(f==0){return 
}var y=this,x=this.reciveUrl(this.channel);
v.showWaitComment();
n.getJSON(x,function(AB){v.removeWaitComment();
n(AB.comments).each(function(){b.appendComment(this,z)
});
v.setCommentCount(AB.size);
y.gotoComment();
if(AB.next!=false){N.show()
}else{N.hide()
}if(AA){AA(y)
}})
},reRecive:function(){n(".mc-comment-list",v.content).empty();
b.liCache={};
N.setPage(0);
this.recive()
},reciveUrl:function(y){var x=j.paidAccount?"/fullComments":"/comments";
return E+"/widget/"+mcSite+x+"?sitePage="+f+"&page="+N.getPage()+"&callback=?"
},gotoComment:function(){var x=window.location.href;
if(x.indexOf("#mc-")>0){document.location.replace(x)
}},submit:function(AE){var AB=n(".mc-comment-submit",AE),AC=this.getParentId(AE),AD=n(".mc-editor-message textarea",AE),x=n(".mc-editor-media textarea",AE),AF=AD.val(),z=n(".mc-comment-media ul li a",AE),y=this.submitUrl(AF,z,AC),AA=n(".mc-spinner-control",AE);
AA.show();
AB.attr("disabled","disabled");
T.send(y.url,y.data,function(AG){var AI=n.parseJSON(AG.data),AJ=AI.comment,AH=AI.error;
AA.hide();
if(AJ){if(AJ.status==="pending"){alert(q.commentPreModer)
}else{b.appendComment(AJ,true)
}AD.val("");
x.val("");
n(".mc-comment-media",AE).remove();
n(".mc-editor-media",AE).hide();
if(AC>0){AE.slideUp("slow")
}}else{if(AH){alert(q[AH])
}}},function(AG){},function(){AD.focus();
AB.removeAttr("disabled")
})
},demoSubmit:function(AE,AA,x,z,AB,AH,AD,AG,AF){var y="";
x.each(function(){y+=" "+n(this).attr("href")
});
var AC={id:AE.demoCommentId,parent:z,message:AB,media:y,rating:0,status:"approved",created:new Date()};
if(j.id){AC.author=j
}else{AC.anonym={}
}b.appendComment(AC,true);
AE.demoCommentId=AE.demoCommentId+1;
AD.hide();
AA.val("");
n("#mc-text-container .mc-media").remove();
if(AG){AG()
}AF()
},submitUrl:function(AA,AC,z){var y="";
AC.each(function(){y+=" "+n(this).attr("href")
});
var x=E+"/widget/"+mcSite+"/createComment",AB={msg:s.escapeSpecialChars(AA),media:y?n.trim(y):y,parentId:0,social:""};
if(f>0){AB.sitePage=f;
AB.siteForum=O
}else{AB.chan=this.channel;
AB.url=this.url;
AB.title=this.title
}if(O>0){AB.siteForum=O
}else{AB.url=this.url;
AB.title=this.title
}if(z>0){AB.parentId=z
}if(n(".mc-social-xpost:visible .mc-social-xpost-checkbox:checked",v.content).length){AB.social="on"
}return{url:x,data:AB}
},vote:function(){if(!j.id){return false
}var x=n(this).attr("href")+"?callback=?";
n.getJSON(x,function(y){b.changeRating(y.id,y.rating)
});
return false
},replyShow:function(AB){var z=AB.data.handler,x=n(AB.target).parents("li:first .mc-comment-wrapper"),y=n(".mc-comment-reply-box",x);
if(y.length>0&&!y.is(":hidden")){y.hide()
}else{if(y.length==0){var AA;
if(typeof mcReplyHtml!="undefined"){AA=mcReplyHtml
}else{AA='<div class="mc-editor"><div class="mc-editor-wrapper"><div class="mc-editor-message"><textarea class="mc-answer-textarea" placeholder="${msg.placeholder}"></textarea><div class="mc-editor-controls"><div class="mc-spinner-control" style="display:none"></div><div class="mc-attachmedia-control" title="${msg.media}"></div></div></div><div class="mc-editor-media"><textarea placeholder="${msg.mediaPlaceholder}"></textarea><div class="mc-editor-controls"><button class="mc-button mc-addmedia-control">${msg.add}</button></div></div></div></div><button class="mc-button mc-comment-submit">${msg.submit}</button>'
}y=n("<div/>").addClass("mc-comment-reply-box");
y.html(h.template(AA));
n(".mc-comment-submit",y).click({handler:z,postbox:y},z.commentSubmit);
n(".mc-attachmedia-control",y).click(S.showMediaTextarea);
n(".mc-addmedia-control",y).click({handler:S,container:y},S.recognizeMedia);
n("textarea",y).bind("keyup",s.textareaAutoResize);
n(".mc-comment-footer",x).after(y)
}y.css("display","inline-block");
n(".mc-editor-message textarea",y).focus()
}return false
},showModerateLink:function(AA){var z=n(AA.target),x=z.parents("li:first");
if(j.moderator){var y=n(".mc-comment-footer .mc-comment-moderate:first",x);
y.show()
}},hideModerateLink:function(AA){var z=n(AA.target),x=z.parents("li:first"),y=n(".mc-comment-footer .mc-comment-moderate:first",x);
if(j.moderator&&n(".mc-controls",y).length==0){y.hide()
}},editComment:function(AD){var AC=n(AD.target),z=AC.parents("li:first"),AB=z.attr("id").replace("mc-",""),x=n(".mc-comment-body:first",z),AA=x.text();
if(n(".mc-answer-textarea",x).length>0){return false
}x.html('<div class="mc-comment-edit-box"><div class="mc-editor"><div class="mc-editor-wrapper"><div class="mc-editor-message"><textarea class="mc-answer-textarea" placeholder="'+q.placeholder+'">'+AA+'</textarea><div class="mc-editor-controls"><div class="mc-spinner-control" style="display:none"></div><div class="mc-attachmedia-control" title="'+q.media+'"></div></div></div><div class="mc-editor-media"><textarea placeholder="'+q.mediaPlaceholder+'"></textarea><div class="mc-editor-controls"><button class="mc-button mc-addmedia-control">'+q.add+'</button></div></div></div></div><button class="mc-button mc-comment-save">'+q.save+'</button><button class="mc-button mc-save-cancel">'+q.cancel+"</button></div>");
n(".mc-answer-textarea",x).focus();
n(".mc-attachmedia-control",x).click(S.showMediaTextarea);
n(".mc-addmedia-control",x).click({handler:S,container:x},S.recognizeMedia);
n("textarea",x).bind("keyup",s.textareaAutoResize);
var y=n(".mc-answer-textarea",x);
y.height(y.prop("scrollHeight"));
n(".mc-comment-save",x).click(function(){var AF=n(".mc-answer-textarea",x).val(),AE=n(".mc-spinner-control",x);
AE.show();
T.send(E+"/comment/"+AB+"/edit",{msg:s.escapeSpecialChars(AF)},function(AG){var AH=n.parseJSON(AG.data);
AE.hide();
if(AH&&AH.error){alert(q[AH.error])
}},function(){},function(){});
return false
});
n(".mc-save-cancel",x).click(function(){b.changeMessage(AB,AA);
return false
});
return false
},removeComment:function(AA){var z=n(AA.target),x=z.parents("li:first"),y=x.attr("id").replace("mc-","");
if(confirm(q.removeConfirm)){T.send(E+"/comment/"+y+"/remove",{msg:"test"},function(AB){x.remove()
},function(){},function(){})
}return false
}};
var Y={etag:"0",time:null,init:function(){var x=this,y;
if(f>0){if(x.time===null){x.time=s.dateToUTCString(new Date())
}if(window.XDomainRequest){setTimeout(function(){x.poll_IE(x)
},2000)
}else{Cackle.mcXHR=y=new XMLHttpRequest();
y.onreadystatechange=y.onload=function(){if(4===y.readyState){if(200===y.status&&y.responseText.length>0){x.etag=y.getResponseHeader("Etag");
x.time=y.getResponseHeader("Last-Modified");
x.action(y.responseText)
}if(y.status>0){x.poll(x,y)
}}};
this.poll(x,y)
}}},poll:function(z,AA){b.updateAppearance();
var y=(new Date()).getTime(),x="http://stream.cackle.me/lp/"+f+"?callback=?&v="+y;
AA.open("GET",x,true);
AA.setRequestHeader("If-None-Match",z.etag);
AA.setRequestHeader("If-Modified-Since",z.time);
AA.send()
},poll_IE:function(z){b.updateAppearance();
var AA=new window.XDomainRequest();
var y=(new Date()).getTime(),x="http://stream.cackle.me/lp/"+f+"?callback=?&v="+y;
Cackle.mcXHR=AA;
AA.onprogress=function(){};
AA.onload=function(){z.action(AA.responseText);
z.poll_IE(z)
};
AA.onerror=function(){z.poll_IE(z)
};
AA.open("GET",x,true);
AA.send()
},action:function(AA){var y=AA.indexOf("["),z=AA.lastIndexOf("}");
var x=n.parseJSON(AA.substring(y+1,z+1));
if(x.event==="status"){b.changeStatus(x.id,x.status.toLowerCase())
}else{if(x.event==="vote"){b.changeRating(x.id,x.rating)
}else{if(x.event==="edit"){b.changeMessage(x.id,x.msg)
}else{v.upCommentCount();
b.appendComment(x,true)
}}}}};
var p={init:function(){n(".mc-auth-provider").click({handler:this},this.loginClick)
},loginClick:function(AA){var x=AA.data.handler,z=n(AA.target),y=x.getAuthProvider(z.attr("class")),AB=K[y];
if(!AB||AB.label){x.authPopup(x.afterLogin,"&provider="+y)
}else{x.loginWindow(AB.url)
}},getAuthProvider:function(y){var x="";
n.each(y.split(" "),function(z,AA){if(AA!="mc-auth-provider"){x=AA.replace("mc-auth-","");
return 
}});
return x
},loginWindow:function(x,y){v.buildWaitAvatar();
var z=window.open(x,q.auth,"width=850,height=500,location=1,status=1,resizable=yes");
this.checkConnection(z,1000,this.afterLogin,y)
},logoutWindow:function(){v.buildWaitAvatar();
var x=window.open(E+"/j_spring_security_logout_mc",q.logout,"width=400,height=400,location=1,status=1,resizable=yes");
this.checkConnection(x,1000)
},afterLogin:function(y){var x=y.widgetUser;
if(x.paidAccount){t.reRecive()
}if(x.id){n(".mc-editor-message textarea:first").focus()
}},authPopup:function(z,y){var x=window.open(E+"/widget/"+mcSite+"/authenticate?"+Z+(y||""),"","width="+500+",height="+350+",location=1,menubar=0,scrollbars=0,resizable=1,status=0");
this.checkConnection(x,200,z)
},authorizeUser:function(z,y){var x=E+"/widget/"+mcSite+"/authorize?callback=?";
n.getJSON(x,function(AA){j=AA.widgetUser;
v.buildLoggedUser(j);
b.updateAppearance();
if(z){z(AA)
}if(y){window.location.reload()
}})
},checkConnection:function(AB,z,AC,y){var AA=this;
function x(){if(AB&&AB.closed){AA.authorizeUser(AC,y)
}else{setTimeout(x,z)
}}setTimeout(x,z)
}};
var L={init:function(){if(typeof mcSSOAuth!="undefined"){if(mcSSOAuth.indexOf("e30= ")<0&&!j.id){this.auth(mcSSOAuth)
}else{if(mcSSOAuth.indexOf("e30= ")==0&&j.id&&j.provider=="sso"){this.logout()
}}}},auth:function(x){n.getJSON(E+"/widget/"+mcSite+"/ssoAuth?callback=?&token="+x,function(y){if(y.result=="success"){p.authorizeUser()
}})
},logout:function(){n.getJSON(E+"/widget/"+mcSite+"/ssoOut?callback=?",function(x){if(x.result=="success"){p.authorizeUser()
}})
}};
var N={container:"",init:function(){this.container=n(".mc-pagination",v.content);
n(".mc-comment-next",this.container).click({handler:this},this.next)
},setPage:function(x){return n(".mc-comment-next",this.container).attr("title",x)
},getPage:function(){var x=n(".mc-comment-next",this.container);
if(x.length){return parseInt(x.attr("title"))
}else{return 0
}},next:function(y){var x=y.data.handler;
x.showWait();
x.setPage(x.getPage()+1);
t.recive(null,function(){x.removeWait()
});
return false
},show:function(){n(".mc-pagination",v.content).show()
},hide:function(){n(".mc-pagination",v.content).hide()
},showWait:function(){n(".mc-comment-next",this.container).append(this.waitImg())
},removeWait:function(){n(".mc-pagination-wait",this.container).remove()
},waitImg:function(){return'<img class="mc-pagination-wait" src="'+E+'/static/img/comment-wait.gif"/>'
}};
var s={days:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],months:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],replaceURLWithHTMLLinks:function(AA){var z=/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig,x=/(^|[^\/])(www\.[\S]+(\b|$))/ig,y=AA.replace(z,'<a href="$1" target="_blank">$1</a>');
return y.replace(x,'$1<a href="http://$2" target="_blank">$2</a>')
},textareaAutoResize:function(){var x=n(this);
x.height(0);
if(parseInt(x.height())<this.scrollHeight){x.height(this.scrollHeight)
}},getBeforeAnchor:function(x){if(x.indexOf("#")>0){return x.substring(0,x.indexOf("#"))
}else{return x.substring(0,x.length)
}},getAfterAnchor:function(x){return x.substring(x.indexOf("#"),x.length)
},escapeSpecialChars:function(y){var z=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,x={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};
z.lastIndex=0;
return z.test(y)?y.replace(z,function(AA){var AB=x[AA];
return typeof AB==="str"?AB:"\\u"+("0000"+AA.charCodeAt(0).toString(16)).slice(-4)
}):y
},getTimeAgo:function(z,AB){var x=new Date().getTime(),AE=x-z,AG=AE/1000,AA=AG/60,AC=AA/60,AD=AC/24,AF=AD/365;
if(AG<45){return AB.second
}else{if(AG<90){return AB.minute
}else{if(AA<45){return AB.minutes(AA)
}else{if(AA<90){return AB.hour
}else{if(AC<24){return AB.hours(AC)
}else{if(AC<48){return AB.day
}else{if(AD<30){return AB.days(AD)
}else{if(AD<60){return AB.month
}else{if(AD<365){return AB.months(AD)
}else{if(AF<2){return AB.year
}else{return AB.years(AF)
}}}}}}}}}}},valueToTwoDigits:function(x){return((x<10)?"0":"")+x
},dateToUTCString:function(x){var y=this.valueToTwoDigits(x.getUTCHours())+":"+this.valueToTwoDigits(x.getUTCMinutes())+":"+this.valueToTwoDigits(x.getUTCSeconds());
return this.days[x.getUTCDay()]+", "+this.valueToTwoDigits(x.getUTCDate())+" "+this.months[x.getUTCMonth()]+" "+x.getUTCFullYear()+" "+y+" GMT"
}};
var m={create:function(z,AA,AB){var x="";
if(AB){var y=new Date();
y.setTime(y.getTime()+(AB*24*60*60*1000));
x="; expires="+y.toGMTString()
}document.cookie=z+"="+AA+x+"; path=/"
},read:function(y){var AA=y+"=";
var x=document.cookie.split(";");
for(var z=0;
z<x.length;
z+=1){var AB=x[z];
while(AB.charAt(0)===" "){AB=AB.substring(1,AB.length)
}if(AB.indexOf(AA)===0){return AB.substring(AA.length,AB.length)
}}return null
},erase:function(x){this.createCookie(x,"",-1)
}};
var T={xhr:null,init:function(){var x=this;
n.getScript(E+"/xdm/easyXDM.min.js",function(y,z){x.xhr=new easyXDM.Rpc({remote:E+"/xdm/index.html"},{remote:{request:{}},serializer:{stringify:function(AA){var AB={id:AA.id,jsonrpc:AA.jsonrpc,method:AA.method,params:AA.params[0]};
return x.stringify(AB)
},parse:function(AA){return n.parseJSON(AA)
}}})
})
},send:function(z,AA,AB,y,x){this.xhr.request({url:z,method:"POST",data:AA},function(AC){AB(AC);
x()
},function(AC){y(AC);
x()
})
},stringify:function(AB){var AA=typeof (AB);
if(AA!="object"||AB===null){if(AA=="string"){AB='"'+AB+'"'
}return String(AB)
}else{var AC,y,z=[],x=(AB&&AB.constructor==Array);
for(AC in AB){y=AB[AC];
AA=typeof (y);
if(AA=="string"){y='"'+y+'"'
}else{if(AA=="object"&&y!==null){y=this.stringify(y)
}}z.push((x?"":'"'+AC+'":')+String(y))
}return(x?"[":"{")+String(z)+(x?"]":"}")
}}};
var U={bind:function(z){var y=this,x=n(z);
x.click(function(){var AA=n(this).next(".mc-controls");
if(AA.length>0){AA.remove()
}else{y.show(this)
}return false
})
},show:function(AC){var AB=this,AA=n(AC).closest("li"),y=AA.attr("id").replace("mc-",""),x=n('<ul class="mc-controls"></ul>');
if(!j.paidAccount){var z=n("<li>"+q.siteAdminNote+'<a href="'+E+'/plans" target="_blank">'+q.siteAdminUpdate+"</a></li>");
x.append(z);
n(AC).after(x);
return false
}n.getJSON(E+"/comment/"+y+"/isBanned?callback=?",function(AE){var AD=AE.commentPrivateInfo;
AB.commentControls(x,y,AD.commentStatus,AC);
if(!AD.anonymComment){x.append(AB.userControl(y,AD,AC))
}x.append(AB.ipControl(y,AD,AC));
n(AC).after(x)
});
return false
},userControl:function(x,AC,AB){var y=n("<li></li>"),z=AC.author||q.guest;
if(AC.email){z+=" <"+AC.email+">"
}var AA;
if(AC.userBanned){AA=this.control(x,"unbanUser",q.unbanUser,AB)
}else{AA=this.control(x,"banUser",q.banUser,AB)
}y.append(AA);
return y
},ipControl:function(y,AB,AA){var x=n("<li></li>");
var z;
if(AB.ipBanned){z=this.control(y,"unbanIp",q.unbanIp,AA)
}else{z=this.control(y,"banIp",q.banIp,AA)
}x.append(z);
return x
},commentControls:function(y,x,AC,AB){var AA=this,z=[];
if(AC==="approved"){z.push("reject")
}else{if(AC==="pending"){z.push("approve");
z.push("reject")
}else{z.push("recovery")
}}if(AC=="spam"){z.push("delete")
}else{if(AC!="deleted"){z.push("spam");
z.push("delete")
}}n.each(z,function(AF,AE){var AD=n("<li></li>");
AD.append(AA.control(x,AE,q[AE],AB));
y.append(AD)
})
},refresh:function(x,z){var y=this;
n.getJSON(x,function(AB){var AA=n(z).next(".mc-controls");
if(AA.length>0){AA.remove()
}y.show(z,AB.commentSmallDto);
return false
});
return false
},control:function(AA,x,z,AC){var y=E+"/comment/"+AA+"/"+x+"?callback=?",AB=n("<a></a>",{href:y});
AB.text(z);
AB.attr("style","color:black!important");
AB.click(n.proxy(this.refresh,this,y,AC));
return AB
}};
var S={init:function(){n(".mc-attachmedia-control").click(this.showMediaTextarea);
n(".mc-addmedia-control").click({handler:this,container:".mc-postbox-container"},this.recognizeMedia)
},showMediaTextarea:function(AA){var z=n(AA.target),x=z.parents(".mc-editor-wrapper:first"),y=n(".mc-editor-media",x);
if(y.is(":visible")){y.slideUp("slow");
n(".mc-editor-controls",y).hide();
z.removeClass("mc-attachmedia-active")
}else{y.slideDown("slow",function(){n(".mc-editor-controls",y).show();
n("textarea",y).focus()
});
z.addClass("mc-attachmedia-active")
}return false
},recognizeMedia:function(AA){var AB=n(AA.target),AG=AA.data.handler,y=n(AA.data.container),AD=AB.parents(".mc-editor-media:first"),z=n("textarea",AD).val(),AF=AG.findLinks(z);
if(AF&&AF.length>0){var AC=AG.makePreview(AF,true);
var AE=n(".mc-comment-media ul",y);
if(AE.length>0){AE.append(n("li",AC))
}else{var x=n("<div/>").addClass("mc-comment-media");
x.append(AC);
n(".mc-editor",y).after(x)
}}return false
},makeContent:function(z){var x=this.findLinks(z);
if(x&&x.length>0){var y=this.makePreview(x);
var AA=n("<div/>").addClass("mc-comment-media");
AA.append(y);
return AA
}},findLinks:function(x){return x.match(/(\b(https?:\/\/((www\.youtube\.com\/watch\?[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])|(vk\.com\/video_ext\.php\?oid=(\d)*&id=(\d)*&hash=(\d|\w)*)|(video\.rutube\.ru\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])|(vimeo\.com\/(\d)*)|([-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|]\.(png|jpg|gif))|(docs\.google\.com\/present\/view?[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])|(www\.slideshare\.net\/slideshow\/embed_code\/(\d)+))))/ig)
},makePreview:function(x,AA){var z=this,y=n("<ul></ul>");
n.each(x,function(){var AB=n("<li></li>"),AC=n("<a/>",{href:this,target:"_blank"});
var AD=this.toString(),AE;
if(AD.indexOf("youtube.com")>-1){AE=z.youtubeThumbl(AD)
}else{if(AD.indexOf("vk.com")>-1){AE=z.vkThumbl(AD)
}else{if(AD.indexOf("video.rutube.ru")>-1){AE=z.rutubeThumbl(AD)
}else{if(AD.indexOf("vimeo.com")>-1){AE=z.vimeoThumbl(AD)
}else{if(AD.indexOf("docs.google.com")>-1){AE=z.presentThumbl(AD)
}else{if(AD.indexOf("slideshare.net")>-1){AE=z.presentThumbl(AD)
}else{AE=z.imgThumbl(AD)
}}}}}}AC.click(function(){window.open(E+"/widget/media?url="+encodeURIComponent(this),"media","width=850,height=500,location=1,status=1,resizable=yes");
return false
});
if(AA){var AF=n("<span></span>");
AB.append(AF);
n(AF).click(function(){AB.remove()
})
}AC.append(AE);
AB.append(AC);
y.append(AB)
});
return y
},youtubeThumbl:function(y){var x=/[\?\&]v=([^\?\&]+)/.exec(y),z=x[1];
return n("<img></img>",{src:"http://i.ytimg.com/vi/"+z+"/0.jpg"})
},vimeoThumbl:function(z){var y=/vimeo\.com\/(\d+)/.exec(z),AA=y[1],x=n("<img></img>");
n.getJSON("http://vimeo.com/api/v2/video/"+AA+".json?callback=?",function(AB){x.attr("src",AB[0].thumbnail_large)
});
return x
},rutubeThumbl:function(x){return n("<img></img>",{src:E+"/static/img/rutube_thumbl.png"})
},vkThumbl:function(x){return n("<img></img>",{src:E+"/static/img/vk_thumbl.png"})
},presentThumbl:function(x){return n("<img></img>",{src:E+"/static/img/presen_thumbl.png"})
},imgThumbl:function(x){return n("<img></img>",{src:x})
}};
var W="&chan="+encodeURIComponent(t.getChannel());
var M="&url="+encodeURIComponent(t.getUrl());
n.getJSON(E+"/widget/"+mcSite+"/bootstrap?callback=?"+W+M+Z,function(AA){var z=AA.widgetBootstrap,x=z.setting,y=x.setting;
j=z.user;
Q=(typeof mcProviders!="undefined")?mcProviders:y.providers;
k=y.avatarSize||k;
V=y.urlRecogn;
d=y.crossposting;
w=x.gravatarEnable;
X=x.maxReplyLevel;
e=x.anonymAvatar||E+"/static/img/anonym.png",a=x.customCss;
f=x.sitePageId;
O=x.siteForumId;
l=x.withoutCopyright;
r=(typeof mcTheme1!="undefined")?mcTheme1:x.theme;
o=x.free;
J=x.editComment;
R=x.removeComment;
q=x.messages;
c=y.mcHeader||q.header;
q.from=y.fromLabel||q.from;
q.placeholder=y.placeholder||q.placeholder;
q.submit=y.submitLabel||q.submit;
q.commentCount=y.commentsLabel||q.commentCount;
q.answer=y.replyLabel||q.answer;
q.nextComments=y.nextLabel||q.nextComments;
i.yandex.name=q.yandex;
i.vkontakte.name=q.vkontakte;
i.mymailru.name=q.mymailru;
i.odnoklassniki.name=q.odnoklassniki;
i.mailru.label=q.mailruLabel;
i.rambler.name=q.rambler;
i.rambler.label=q.ramblerLabel;
i.myopenid.label=q.myopenidLabel;
i.livejournal.name=q.livejournal;
i.livejournal.label=q.livejournalLabel;
i.flickr.label=q.flickrLabel;
i.wordpress.label=q.wordpressLabel;
i.blogger.label=q.bloggerLabel;
i.verisign.label=q.verisignLabel;
v.init();
b.init();
L.init();
t.init();
Y.init();
T.init();
p.init();
N.init();
S.init();
if(g){g(Cackle.mcJQ)
}});
Cackle.CommentBuilder=b
}function B(){if(Cackle.mcXHR){Cackle.mcXHR.abort()
}Cackle.mcJQ(document).unbind(".cackle");
C(Cackle.mcJQ)
}function F(){var J={};
J.run=function(){if(Cackle.mcJQ("#mc-container").length>0&&typeof mcSite!="undefined"&&!Cackle.isLoaded){Cackle.isLoaded=true;
C(Cackle.mcJQ)
}else{setTimeout(J.run,50)
}};
J.run()
}var D=document.createElement("script");
D.type="text/javascript";
D.src=E+"/static/js/mc.jquery.js";
D.async=false;
if(typeof D.onload!="undefined"){D.onload=F
}else{if(typeof D.onreadystatechange!="undefined"){D.onreadystatechange=function(){if(this.readyState=="complete"||this.readyState=="loaded"){F()
}}
}else{D.onreadystatechange=D.onload=function(){var J=D.readyState;
if(!J||/loaded|complete/.test(J)){F()
}}
}}(document.getElementsByTagName("head")[0]||document.documentElement).appendChild(D);
Cackle.main=C;
Cackle.reinit=B;
Cackle.timeAgo=G
})();