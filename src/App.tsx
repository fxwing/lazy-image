import React from 'react';
import {Button} from 'antd'
import LazyImage  from '@pages/LazyImage'


const App: React.FC = ()=>{
  const list = new Array(20).fill(0)
  return (
    <main className="App">
      <Button type="primary">测试antd</Button>
      {list.map((i, index) =>
      <LazyImage key={index}
      style={{height:'100px'}}
      src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fa0.att.hudong.com%2F52%2F62%2F31300542679117141195629117826.jpg&refer=http%3A%2F%2Fa0.att.hudong.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1618992720&t=470d8c6c10c3e5407aedb23a902b4b80"
      placeholder="这是一个图片地址" />)}
    </main>
  );
}

export default App;
