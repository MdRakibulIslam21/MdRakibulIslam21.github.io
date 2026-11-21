(function(){
  var root=document.documentElement;
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* theme toggle */
  var saved=null;try{saved=localStorage.getItem('theme')}catch(e){}
  if(saved==='light'||saved==='dark')root.setAttribute('data-theme',saved);
  document.getElementById('theme').addEventListener('click',function(){
    var cur=root.getAttribute('data-theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
    var next=cur==='dark'?'light':'dark';
    root.setAttribute('data-theme',next);
    try{localStorage.setItem('theme',next)}catch(e){}
  });

  /* mobile menu */
  var nav=document.querySelector('nav'),menu=document.getElementById('menu');
  menu.addEventListener('click',function(){
    var o=nav.classList.toggle('open');menu.setAttribute('aria-expanded',o);
  });
  nav.addEventListener('click',function(e){
    if(e.target.tagName==='A'){nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}
  });

  /* active nav link */
  var links=[].slice.call(nav.querySelectorAll('a'));
  if('IntersectionObserver' in window){
    var spy=new IntersectionObserver(function(es){
      es.forEach(function(e){
        if(e.isIntersecting){links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id)})}
      });
    },{rootMargin:'-40% 0px -55% 0px'});
    links.forEach(function(a){var el=document.getElementById(a.getAttribute('href').slice(1));if(el)spy.observe(el)});
  }

  /* scroll progress bar */
  var bar=document.getElementById('progress');
  function prog(){
    var h=document.documentElement.scrollHeight-innerHeight;
    bar.style.transform='scaleX('+(h>0?Math.min(scrollY/h,1):0)+')';
  }
  addEventListener('scroll',prog,{passive:true});prog();

  /* reveal on scroll */
  if(!reduce&&'IntersectionObserver' in window){
    var rv=new IntersectionObserver(function(es){
      es.forEach(function(e){if(e.isIntersecting){
        var t=e.target;t.classList.add('in');rv.unobserve(t);
        setTimeout(function(){t.classList.remove('rv','in');t.style.transitionDelay=''},1000);
      }});
    },{threshold:.12});
    [].slice.call(document.querySelectorAll('section h2,.sub,.card,.stat,.cta')).forEach(function(el,i){
      el.classList.add('rv');
      el.style.transitionDelay=(i%3)*80+'ms';
      rv.observe(el);
    });
  }

  /* typing effect */
  var el=document.getElementById('role');
  if(reduce)return;
  var roles=['CSE Student','Software Developer','AI Enthusiast','Problem Solver','Researcher'],i=0,j=el.textContent.length,del=true;
  function tick(){
    if(del){j--;if(j<=0){del=false;i=(i+1)%roles.length}}
    else{j++;if(j>=roles[i].length){del=true;el.textContent=roles[i];return setTimeout(tick,1800)}}
    el.textContent=roles[i].slice(0,Math.max(j,0));
    setTimeout(tick,del?45:85);
  }
  setTimeout(tick,2200);
})();
