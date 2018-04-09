import UUID from 'uuid-js';
/**
 * 每次只有一个notification 
 * @todo 存在多个notification, 因此需要排队，每次只展示一个。
 */
class Notification {
  constructor(){
    this.queue = [];
    this.closeTimer = null;
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
    this.closeTimer = setTimeout(()=>{
      this.hide();
    }, duration);
  }
  /**
   * 隐藏notification
   */
  hide(){
    if(this.closeTimer){
      clearTimeout(this.closeTimer);
    }
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

    .toast-content-${uuid}{
      min-width: 60px;
      border-radius: 2px;
      color: #fff;
      background: rgba(0, 0, 0, 0.6);
      font-size: 12px;
      padding: 6px 6px;
      -webkit-box-sizing: border-box;
              box-sizing: border-box;

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