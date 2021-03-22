import React, { useCallback, useState, useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'
// import { Button } from 'antd'
// import style from './index.less'

export interface Iprops {
  src?: string;
  placeholder?: string;
  className?: string;
  style?: CSSProperties;
  offset?: number;
}

export type TimeOut = ReturnType<typeof setTimeout>

const LazyImage: React.FC<Iprops> = (props: Iprops) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const imgRef = useRef<HTMLDivElement>(null)
  const handleScroll = throttle(_handleScroll, 500)
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    }
  }, [])
  // 函数节流
  function throttle(fn: () => void, delay: number): () => void {
    let timer: TimeOut | null = null;
    // let count: number = 0;
    return function (this: any, ...argus) {
      const context = this;
      // 防抖
      // if (timer){
      //   clearTimeout(timer)
      // }
      // 节流
      if (timer) return;
      timer = setTimeout(function () {
        // count++;
        // console.log('这里执行了吗？', count)
        fn.apply(context, argus);
        clearTimeout(timer as TimeOut);
        timer = null;
      }, delay);
    }
  }

  //获取窗口的高度
  const getClientHeight = (): number => {
    let clientHeight = 0;
    if (document.documentElement.clientHeight && document.body.clientHeight) {
      clientHeight = Math.min(document.documentElement.clientHeight, document.body.clientHeight)
    } else {
      clientHeight = Math.max(document.documentElement.clientHeight, document.body.clientHeight)
    }
    return clientHeight;
  }
  // 获取滚动的高度
  const getScrollTop = (): number => {
    let scrollTop: number = 0;
    if (document.documentElement.scrollTop) {
      scrollTop = document.documentElement.scrollTop
    } else if (document.body.scrollTop) {
      scrollTop = document.body.scrollTop
    } else {
      scrollTop = window.scrollY || window.pageYOffset
    }
    return scrollTop;
  }

  // 获取当前图片具体屏幕顶部xy坐标
  const getNodeTop = () => {
    // console.log(imgRef)
    const viewTop = getScrollTop();
    let nodeTop: number = 0;
    let nodeBottom: number = 0
    if (imgRef.current) {
      nodeTop = imgRef.current.getBoundingClientRect().top + viewTop
      nodeBottom = imgRef.current.offsetHeight + nodeTop;
    }
    // console.log(nodeTop, nodeBottom)
    return ({
      nodeTop, nodeBottom
    })
  }


  // 滚动事件
  function _handleScroll() {
    const { offset = 0 } = props;
    // 当前图片的顶部和底部到网页最顶部的距离
    const { nodeTop, nodeBottom } = getNodeTop();
    // 当前网页到顶部的距离
    const viewTop = getScrollTop();
    // 当前网页底部到最顶部的距离
    const viewBottom = viewTop + getClientHeight();
    // 判断逻辑 图片的top 小于视图的bottom
    // 图片的bottom 大于视图的top
    if (nodeBottom + offset >= viewTop && nodeTop - offset <= viewBottom) {
      setIsLoaded(true)
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    }

  }


  // const testThrottle = useCallback(() => {
  //   const fn = throttle(() => console.log(222), 1000)
  //   return fn
  // }, [])

  // const refCallback = useCallback((node) => {
  //   if (node) {
  //     setImgRef(node)
  //   }
  // }, [])

  const { placeholder, offset, ...imgProps } = props;
  return (
    <>
      {/* <Button type="dashed" onClick={testThrottle()}>测试节流</Button> */}
      <div ref={imgRef}>
        {isLoaded ? <img alt="这是一个图片"  {...imgProps} /> : <span>{placeholder}</span>}
      </div>
    </>
  )
}
export default LazyImage
