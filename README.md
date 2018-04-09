## Toast

### 为什么重复造轮子?
目前能搜到的 `toast` 基本都是基于Vue 或者 React 的，可是我只想要一个拿来就能用的 `toast`。

### API

```javasctipt
import Toast from 'toast';

const toast = new Toast();

// 轻提示
toast.info('hello world', 1500);

// 加载提示
toast.loading(content, duration);
toast.hide();
```