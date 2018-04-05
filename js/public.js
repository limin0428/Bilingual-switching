let data=null;
let isMount=null;
let isId=null;
let isIndex=null;
let aboutMine=document.getElementById('about-text');
let menuZonyaMenu=document.getElementById('menu-zonya-menu');
let portfolioWrap1=document.getElementById('portfolio-wrap1');
let portfolioWrap2=document.getElementById('portfolio-wrap2');
let portfolioWrap3=document.getElementById('portfolio-wrap3');
let staffWrap=document.getElementById('staff-wrap');
let portfolioList1=document.getElementsByClassName('portfolio-wrap1');
let portfolioList2=document.getElementsByClassName('portfolio-wrap2');
let portfolioList3=document.getElementsByClassName('portfolio-wrap3');
let portfolioId=document.getElementById('portfolio-id');
let public=(function (){
  function getData(url){
    let xhr=new XMLHttpRequest();
    xhr.open("GET",url,false);
    xhr.onreadystatechange=function(){
      if(xhr.status===200&&xhr.readyState===4){
        data=JSON.parse(xhr.responseText)
      }
    };
    xhr.send(null);
    localStorage.setItem('data',JSON.stringify(data));
    localStorage.setItem('isMount','true');
    isId=Number(localStorage.getItem('id'));
    isIndex=Number(localStorage.getItem('isIndex'));
    publicTitle(data[0]);
    aboutText(data[1]);
    teamText(data[2]);
    portfolioText(data[3].portfolioList);
    getPortfolio(data[3].portfolioList[isIndex].text,isId)
  }
  function publicTitle(data){
    let str='';
    str+=`
            <li id="menu-item-4821"
                                class="menu-item menu-item-type-post_type menu-item-object-page menu-item-4821"><a class="list"
                                    href="index.html">${data.publicTitle.home}</a></li>
            <li id="menu-item-4861"
                                class="menu-item menu-item-type-post_type menu-item-object-page current-menu-item page_item page-item-45 current_page_item menu-item-4861">
                                <a class="list" href="about.html">${data.publicTitle.about}</a></li>
            <li id="menu-item-4823"
                                class="menu-item menu-item-type-post_type menu-item-object-page menu-item-4823"><a class="list"
                                    href="portfolio.html">${data.publicTitle.portfolio}</a></li>
            <li id="menu-item-4825"
                                class="menu-item menu-item-type-post_type menu-item-object-page menu-item-4825"><a class="list"
                                    href="team.html">${data.publicTitle.team}</a></li>
            <li id="menu-item-4860"
                                class="menu-item menu-item-type-post_type menu-item-object-page menu-item-4860"><a class="list" href="contact.html">${data.publicTitle.contact}</a></li>
            <li id="menu-item-4827"
                                class="qtranxs-lang-menu qtranxs-lang-menu-zh menu-item menu-item-type-custom menu-item-object-custom current-menu-parent menu-item-has-children dropdown menu-item-4827">
                                <a class="list" title=${data.national.title} href="#" id="national-title">${data.publicTitle.language}<img src=${data.national.src} alt="English" id="national-flag"/> <img
                                        src="img/down.png"></a>
                                <ul class="sub-menu">
                                    <li id="menu-item-4862"
                                        class="qtranxs-lang-menu-item qtranxs-lang-menu-item-zh menu-item menu-item-type-custom menu-item-object-custom current-menu-item menu-item-4862" onclick="(function(){public.getData('data/data-chinese.json')})()">
                                        <a title="中文" href="#"><img src="img/cn.png" alt="中文"/> 中文</a>
                                    </li>
                                    <li id="menu-item-4863"
                                        class="qtranxs-lang-menu-item qtranxs-lang-menu-item-en menu-item menu-item-type-custom menu-item-object-custom menu-item-4863" onclick="(function(){public.getData('data/data-english.json')})()">
                                        <a title="English" href="#"><img src="img/us.png" alt="English"/> English</a>
                                    </li>
                                </ul>
                            </li>
  `;
    if(menuZonyaMenu){
      menuZonyaMenu.innerHTML=str;
    };
    let list=document.getElementsByClassName('list');
    for(let j=0;j<list.length;j++) {
      list[j].style.color='#898989';
      list[j].onclick = (e) => {
        e.target.style.color='#861a1f';
        localStorage.setItem('linkId',JSON.stringify(j));
      }
    };
    if(localStorage.getItem('linkId')){
      list[Number(localStorage.getItem('linkId'))].style.color='#861a1f';
    }
  };
  function teamText(data){
    let str='';
    data.team.forEach(item=>{
      str+=`
    <article class="post-5077 staff type-staff status-publish hentry staff-entry staff-grid">
                <div class="post-wrapper clr">
                  <div class="staff-entry-text">
                    <header class="staff-entry-header">
                      <h2 class="staff-entry-title">${item.name}</h2>
                      <h3 class="staff-position">${item.position}</h3>
                    </header>
                    <div class="staff-info"></div>
                  </div>
                </div>
                <!-- .post-wrapper -->
              </article>
    `});
    if(staffWrap){
      staffWrap.innerHTML=str;
    }
}
  function aboutText(data){
    let str='';
    str+=`
        <p>${data.about.aboutText}</p>
     `;
    if(aboutMine){
      aboutMine.innerHTML=str;
    }
  };
  function portfolioText(data){
    let str1='';
    let str2='';
    let str3='';
    data[0].text.forEach(item=>str1+=`
        <article class="post-4973 portfolio type-portfolio status-publish format-standard has-post-thumbnail hentry portfolio-entry col-md-3 col-sm-6 portfolio-wrap1">
                <div class="post-wrapper">
                  <div class="portfolio-entry-media has-overlay">
                    <img class="portfolio-entry-img style1"
                         src="${item.src}"
                         alt="Meta"/>
                    <a class="image-overlay style1"
                       href="./portfolioList.html">
                      <div class="image-overlay-content">${item.text}
                      </div>
                    </a>
                  </div>
                  <div class="portfolio-entry-details clr">
                    <h3 class="portfolio-entry-title">
                      <a
                          href="/portfolio/item/6/?lang=en"
                          title="Meta" rel="bookmark">${item.title}</a>
                    </h3>
                  </div>
                </div>
        </article>
    `);
    str1+=`<div class="clear"></div>`;
    if(portfolioWrap1){
      portfolioWrap1.innerHTML=str1;
    }
    data[1].text.forEach(item=>str2+=`
        <article class="post-4973 portfolio type-portfolio status-publish format-standard has-post-thumbnail hentry portfolio-entry col-md-3 col-sm-6 portfolio-wrap2">
                <div class="post-wrapper">
                  <div class="portfolio-entry-media has-overlay">
                    <img class="portfolio-entry-img style1"
                         src="${item.src}"
                         alt="Meta"/>
                    <a class="image-overlay style1"
                       href="./portfolioList.html">
                      <div class="image-overlay-content">${item.text}
                      </div>
                    </a>
                  </div>
                  <div class="portfolio-entry-details clr">
                    <h3 class="portfolio-entry-title">
                      <a
                          href="/portfolio/item/6/?lang=en"
                          title="Meta" rel="bookmark">${item.title}</a>
                    </h3>
                  </div>
                </div>
        </article>
    `);
    str2+=`<div class="clear"></div>`;
    if(portfolioWrap2){
      portfolioWrap2.innerHTML=str2;
    };
    data[2].text.forEach(item=>str3+=`
        <article class="post-4973 portfolio type-portfolio status-publish format-standard has-post-thumbnail hentry portfolio-entry col-md-3 col-sm-6 portfolio-wrap3">
                <div class="post-wrapper">
                  <div class="portfolio-entry-media has-overlay">
                    <img class="portfolio-entry-img style1"
                         src="${item.src}"
                         alt="Meta"/>
                    <a class="image-overlay style1"
                       href="./portfolioList.html">
                      <div class="image-overlay-content">${item.text}
                      </div>
                    </a>
                  </div>
                  <div class="portfolio-entry-details clr">
                    <h3 class="portfolio-entry-title">
                      <a
                          href="/portfolio/item/6/?lang=en"
                          title="Meta" rel="bookmark">${item.title}</a>
                    </h3>
                  </div>
                </div>
        </article>
    `);
    str3+=`<div class="clear"></div>`;
    if(portfolioWrap3){
      portfolioWrap3.innerHTML=str3;
    }
  };
  function getPortfolio(data,i){
    let str='';
    str+=`
       <div class="">
                    <div class='element-container element-title' style="margin:20px 0px 36px">
                      <!--<h2 class="heading  h1 text-center">Team</h2>-->
                      <img src=${data[i].src} alt="" id="portfolio-list-img" style="display: block;margin: auto;width: 265px;height:181px;">
                    </div>
                    <div style="text-align: center">WebSite：<a href=${data[i].href}>${data[i].alt}</a></div>
                    <p style="text-align: center;margin-bottom:12px;">${data[i].text}</p>
                  </div>
    `;
    if(portfolioId){
      portfolioId.innerHTML=str;
    }
  }
    return  {
      publicTitle:publicTitle,
      getData:getData,
      aboutText:aboutText,
      teamText:teamText,
      portfolioText:portfolioText,
      getPortfolio:getPortfolio,
    }
})();






