import UUID from 'uuid-js';
/**
 * 每次只有一个notification 
 * @todo 存在多个notification, 因此需要排队，每次只展示一个。
 */
class Notification {
  constructor(){
    this.queue = [];
    this.closeTimer = null;
    this.isInfinite = false; //是否永久展示
    this.isShow = false; //是否正在展示
    this.div = document.createElement('div');
    
    this.uuid = UUID.create();
    this.insertCss(this.uuid);
  }
  /**
   * 添加到页面节点
   */
  add(duration=1500){
    this.div.classList.add(`toast-container-${this.uuid}`);
    document.body.appendChild(this.div);
    this.isShow = true;
    if(duration == 0){
      this.isInfinite = true;
    }  

    if(!this.isInfinite){
      this.closeTimer = setTimeout(()=>{
        this.hide();
      }, duration);
    }
    
  }
  /**
   * 隐藏notification
   */
  hide(){
    if(!this.isShow){
      return;
    }
    if(this.closeTimer){
      clearTimeout(this.closeTimer);
    }
    this.div.innerHTML = '';
    this.div.parentNode.removeChild(this.div);
  }

  /**
   * 显示notification
   * @param content
   * @param duration
   */
  info(content, duration){

    const htmlData = `
      <div class="toast-mask-${this.uuid}">
        <div class="toast-${this.uuid}">
          <div class="toast-content-${this.uuid}">${content}</div>
        </div>
      </div>
    `;
    this.appendHtml(this.div, htmlData);
    this.add(duration);
  }
  /**
   * 显示loading
   * @param content
   * @param duration 如果为0，则认为是无限时长，需要手动调用hide() 隐藏
   * 
   */
  loading(content, duration){
    const htmlData = `
      <div class="toast-mask-${this.uuid}">
        <div class="toast-${this.uuid}">
          <div class="toast-content-${this.uuid}">
            <div class="toast-icon-${this.uuid}">
              <svg id="loading" viewBox="0 -2 59.75 60.25" width="100%" height="100%"><path fill="#ccc" d="M29.69-.527C14.044-.527 1.36 12.158 1.36 27.806S14.043 56.14 29.69 56.14c15.65 0 28.334-12.686 28.334-28.334S45.34-.527 29.69-.527zm.185 53.75c-14.037 0-25.417-11.38-25.417-25.417S15.838 2.39 29.875 2.39s25.417 11.38 25.417 25.417-11.38 25.416-25.417 25.416z"></path><path fill="none" stroke="#108ee9" stroke-width="3" stroke-linecap="round" stroke-miterlimit="10" d="M56.587 29.766c.37-7.438-1.658-14.7-6.393-19.552"></path></svg>
            </div>
            <div class="toast-content-text-${this.uuid}">
              ${content}
            </div>
          </div>
        </div>
      </div>
    `;
    this.appendHtml(this.div, htmlData);
    this.add(duration);
  }

  /**
   * 注入子节点
   * @param {*} htmlData 
   */
  appendHtml(div, htmlData){
    div.insertAdjacentHTML('afterbegin', htmlData);
  }

  /**
   * 注入css
   */
  insertCss(uuid){
    const css = `
    .toast-container-${uuid}{
      position: fixed;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      z-index: 99;
      font-size: 14px;
      text-align: center;
      
    }
    .toast-mask-${uuid}{
      height: 100%;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: center;
          -ms-flex-pack: center;
              justify-content: center;
      -webkit-box-align: center;
          -ms-flex-align: center;
              align-items: center;
      left: 0;
      top: 0;
    }
    .toast-${this.uuid}{

    }
    .toast-icon-${this.uuid}{
      margin-bottom: 6px;
      text-align: center;
    }
    .toast-icon-${this.uuid} svg{
      display: inline;
      width: 36px;
      height: 36px;
      display: inline;
      width: 36px;
      height: 36px;
      -webkit-animation: animation-loading 1s linear infinite;
              animation: animation-loading 1s linear infinite;
    }
    .toast-content-${uuid}{
      min-width: 60px;
      border-radius: 2px;
      color: #fff;
      background-color: rgba(58, 58, 58, 0.9);
      line-height: 1.5;
      padding: 9px 15px;
      -webkit-box-sizing: border-box;
              box-sizing: border-box;

    }
    @-webkit-keyframes animation-loading{
      100%{
        -webkit-transform: rotate(360deg);
                transform: rotate(360deg);
      }
    }
    @keyframes animation-loading{
      100%{
        -webkit-transform: rotate(360deg);
                transform: rotate(360deg);
      }
    }
    `;

    const styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    if (styleElement.styleSheet) {
      styleElement.styleSheet.cssText = css;
    } else {
      styleElement.appendChild(document.createTextNode(css));
    }
    document.getElementsByTagName('head')[0].appendChild(styleElement);
    

  }
  


}

export default Notification;