import { useState, useRef, useEffect } from "react";
import htmlParser from "html-parse-stringify";
import "./styles.less";

export interface ImgInterface {
  uid: string;
  url: string | number;
  name: string;
  status: string;
}
export interface RichText {
  text: string,
  files: ImgInterface[]
}

interface IProps{
  setRichText: any,
  richText: RichText,
  children: {},
  feedbackValue: string
}
export default function InputMessage(props: IProps) {
  const NICKNAME_KEYWORD = "#客户昵称#",
    NICKNAME_IMG_SRC = require('./public/nickname.svg');
  const { setRichText, richText, children, feedbackValue } = props;
  const ref = useRef<any>({});
  const cache = useRef<string>("");
  
  const selObj = useRef<any>(window.getSelection());

  useEffect(() => {
    ref.current.addEventListener("paste", (e:any) => onPaste(e));
    ref.current.addEventListener("keydown", (e:any) => {
      console.log("keydown", e);
      const val = getContent(ref.current.innerHTML);
      if (val.length >= 1500 && e.keyCode !== 8) e.preventDefault();
    });
    if (feedbackValue) {
      ref.current.focus();
      getKeyWord(feedbackValue)
    }
  }, []);

  const getContent = (data = {}, children = []) => {
    let ast = [],
      val = "";
    // console.log("data", data);
    try {
      ast = !children.length ? htmlParser.parse(data) : children;
    } catch (error) {
      ast = [];
      console.log("error", error);
    }

    console.log('ast', ast, children);
    ast.forEach((item: any) => {
      if (item.type === "text") {
        // val = val + item.content + "";
        // const aa = item.content.match(/(\r\n)|(\n)|(\r)/gi)
        // console.log('aa', item.content);
        
        // val = val + item.content.replace(/(\r\n)|(\n)|(\r)/gi, "br") + ""
        val = val + item.content + ""

        // console.log('val', val)
      } else if (item.type === "tag") {
        if (item.name === "img") {
          val = val + item.attrs.alt;
        } else if (item.name === "div") {
           val = val + "br" + getContent({}, item.children);
        } else {
          val = val + getContent({}, item.children);
        }
      } else {
        val = val + "";
      }
    });
    return val;
  };

  const onInput = (e: any) => {
    console.log('12123');
    
    const temp = getContent(e.target.innerHTML);
    // console.log("onInput", temp);
    setRichText({...richText, text: temp});
  };
  const onChange = (e: any) => {
    console.log("onChange");
    ref.current.focus();

    // todo 使用style 实现颜色
    insertHtmlFragment(
      `<img src="${NICKNAME_IMG_SRC}" alt="${NICKNAME_KEYWORD}"/>`
    );
  };
  const onClick = () => {
    ref.current.focus();
  };

  const insertHtmlFragment = (html: string) => {
    console.log("insertHtmlFragment");

    let range;
    if (selObj.current.getRangeAt && selObj.current.rangeCount) {
      // range找到鼠标选中区域，拿到第一个位置
      range = selObj.current.getRangeAt(0);
      console.log("range", range);
      // 删除选中区域内容
      range.deleteContents();

      let val = getContent(ref.current.innerHTML);

      // 创建一个新标签来装img
      let el:any = document.createElement("div");
      el.innerHTML = html;
      let frag = document.createDocumentFragment(),
        node,
        lastNode;
      // 控制输入长度
      let valPlus = val + el.firstChild.alt;
      val = ''
      if (valPlus.length >= 1500) {
        return;
      }

      while ((node = el.firstChild)) {
        console.log('node', node);
        
        lastNode = frag.appendChild(node);
      }
      range.insertNode(frag);

      if (lastNode) {
        // range = range.cloneRange();
        range.setStartAfter(lastNode);
        range.collapse(true);
        
        selObj.current.removeAllRanges();
        selObj.current.addRange(range);
        range.detach()
      }
      valPlus = getContent(ref.current.innerHTML);
      setRichText({...richText, text: valPlus});
      valPlus = ''
      lastNode = ''
      node = ''
      
    }
  };

  const onPaste = (e: any) => {
    console.log("onPaste");
    const val = getContent(ref.current.innerHTML);

    e.preventDefault();
    let text = (e.originalEvent || e).clipboardData.getData("text/plain");

    if ((val + text).length > 1500) {
      return;
    }
    // 关键词转化下
    getKeyWord(text);
  };

  const getKeyWord = (text: string) => {
    if (text.indexOf(NICKNAME_KEYWORD) > -1) {
      var array = text.split(NICKNAME_KEYWORD);
      document.execCommand(
        "insertHtml",
        false,
        array.join(
          '<img src="' + NICKNAME_IMG_SRC + '" alt="' + NICKNAME_KEYWORD + '">'
        )
      );
    } else {
      document.execCommand("insertText", false, text);
    }
  };

  const onComposition = (e: any) => {
    if (e.type === "compositionstart") {
      // console.log("compositionstart");
      cache.current = getContent(ref.current.innerHTML);
    } else if (e.type === "compositionend") {
      // console.log("compositionend");
      const val = getContent(ref.current.innerHTML);
      // console.log('e.target.innerHTML', val, e.target.innerHTML)
      const value = e.target.innerHTML + val;
      // console.log(ref.current);
      if (value.length > 1500) {
        // console.log('cache', cache.current);
        const len = (ref.current.innerHTML = cache.current).length;
        ref.current.focus();
        // 获取输入框对象，并将光标移动到最后，如果不这么做，光标自动移动到首位
        selObj.current.selectAllChildren(ref.current);
        selObj.current.collapseToEnd();
      }
    }
  };

  return (
    // "{客户昵称}欢迎成为我的客户，接下来由我向您提供服务"
    <div className="inputMessage">
      <div
        contentEditable="true"
        ref={ref}
        onInput={onInput}
        onClick={onClick}
        className="textarea"
        onCompositionStart={onComposition}
        // onCompositionUpdate={onCompositionUpdate}
        onCompositionEnd={onComposition}
      ></div>
      <div className="input-footer">
        <img
          src={NICKNAME_IMG_SRC}
          className="nickname"
          alt=""
          onClick={onChange}
        />
        <span className="last-num">{richText?.text?.length}/1500</span>
      </div>
      <div>{children}</div>
    </div>
  );
}
