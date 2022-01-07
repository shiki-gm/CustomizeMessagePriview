import React, { useState, useCallback, useRef, Fragment, useEffect } from 'react';
import { Upload, Button, Tooltip, Popover, Modal } from 'antd';

import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import { ModalContent } from "qimai-rc-business";
import Activity from "./comp/Activity";
import Goods from "./comp/Goods";
import UrlLink from "./comp/UrlLink";
import { ImgInterface, RichText } from "./InputMessage";


import styles from "./styles.less";


const type = 'DragableUploadList';
const DragableUploadListItem = ({ originNode, moveRow, file, fileList }) => {
  const ref = React.useRef();
  const index = fileList.indexOf(file);
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: monitor => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      };
    },
    drop: item => {
      moveRow(item.index, index);
    },
  });
  const [, drag] = useDrag({
    type,
    item: { index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));
  const errorNode = <Tooltip title="Upload Error">{originNode.props.children}</Tooltip>;
  return (
    <div
      ref={ref}
      className={`ant-upload-draggable-list-item ${isOver ? dropClassName : ''}`}
      style={{ cursor: 'move' }}
    >
      {file.status === 'error' ? errorNode : originNode}
    </div>
  );
};

interface IProps {
  setRichText: any,
  richText: RichText
}
export const DragSortingUpload = (props: IProps) => {
  const { setRichText, richText } = props;
  
  const [isModalVisible, setIsModalVisible] = useState<any>({
    activityVisible: false,
    goodsVisible: false,
    urlLinkVisible: false,
    imgVisible: false,
  });
  const [tempSelected, setTempSelected] = useState<string[]>([])
  const [clicked, setClicked] = useState<boolean>(false)
  const [fileList, setFileList] = useState<ImgInterface[]>(richText.files);
  const uploadRef = useRef<any>({})

  useEffect(() => {
    uploadRef.current.getElementsByTagName('input')[0].setAttribute("disabled","true")
  }, [])

  useEffect(() => {
    setRichText({...richText, files: fileList})
  }, [fileList])

  const onClick = (e:any) => {
    if(!e?.target) {
      setClicked(e)
      return
    }
    const type: string = e.target?.parentNode?.getAttribute('datatype')
    switch (type) {
      case 'img':
      case 'mp4':
      case 'file':
        setIsModalVisible(val => ({...val, imgVisible: true}));
        break
      case 'url':
        setIsModalVisible(val => ({...val, urlLinkVisible: true}));
        break
      case 'goods':
        setIsModalVisible(val => ({...val, goodsVisible: true}));
        break
      case 'activity':
        setIsModalVisible(val => ({...val, activityVisible: true}));
        break
      default:
        break;
    }

    setClicked(false)
    
  }
  const onChange = (type: string, data: any = null) => {
    console.log('data', data);
    
    if (data !== null) {
      switch (type) {
        case 'imgVisible':
          console.log('data', data.data);
          console.log('[...fileList, ...data.data]', [...fileList, ...data.data], fileList);
          
          setFileList([...fileList, ...data.data])
          // setFileList(data.data)
          break
        case 'urlLinkVisible':
          console.log('data', data);
          
          break
        case 'goodsVisible':
          // setFileList([...fileList, ...data.data])qcode
          console.log('data', data);
          const qcodes = data?.data?.map((item: {qcode: string}) => item.qcode ? item.qcode : '') || []
          console.log('urls', qcodes);
          
          setFileList([...fileList, ...handleData(qcodes)])
          break
        case 'activityVisible':
          console.log('data', data);
          const urls = data?.data?.map((item: {url: string}) => item.url ? item.url : '') || []
          console.log('urls', urls);
          
          setFileList([...fileList, ...handleData(urls)])
          break
        default:
          break;
      }
    }
    setIsModalVisible((val: any) => ({...val, [type]: false}));
  }


  const onRemove = (file: {uid: string}) => {
    const temp = fileList.filter(item => item.uid !== file.uid)
    setFileList(temp)
  }

  const handleData: any = (data: string[]) => {
    return data.map((item: string) => {
      const reg = item.split('/')
      const len = reg.length
      return len && {
        uid: -Math.floor(Math.random() * 10000000),
        name: reg[len - 1],
        status: 'done',
        url: item
      }
    })
  }
  const content = (
    <div className={styles.popover} onClick={onClick}>
      <div datatype='img'>
        <div className={styles.cardBg}></div>
        <div className={styles.cardFont}>图片</div>
      </div>
      <div datatype='mp4'>
        <div className={styles.cardBg}></div>
        <div className={styles.cardFont}>视频</div>
      </div>
      <div datatype='file'>
        <div className={styles.cardBg}></div>
        <div className={styles.cardFont}>文件</div>
      </div>
      <div datatype='url'>
        <div className={styles.cardBg}></div>
        <div className={styles.cardFont}>链接</div>
      </div>
      <div datatype='goods'>
        <div className={styles.cardBg}></div>
        <div className={styles.cardFont}>商品</div>
      </div>
      <div datatype='activity'>
        <div className={styles.cardBg}></div>
        <div className={styles.cardFont}>活动</div>
      </div>
    </div>
  );

  const moveRow = useCallback(
    (dragIndex, hoverIndex) => {
      const dragRow = fileList[dragIndex];
      setFileList(
        update(fileList, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRow],
          ],
        }),
      );
    },
    [fileList],
  );

  return (
    <Fragment>
      <div className={styles.uploadContainer} ref={uploadRef}>
        <DndProvider backend={HTML5Backend}>
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            fileList={fileList}
            onRemove={onRemove}
            itemRender={(originNode, file, currFileList) => (
              <DragableUploadListItem
                originNode={originNode}
                file={file}
                fileList={currFileList}
                moveRow={moveRow}
              />
            )}
          >
            <Popover placement="topLeft" content={content} trigger="click" visible={clicked} onVisibleChange={onClick}>
              <div className={styles.openUpload} onClick={e => {
                e.stopPropagation()
                setClicked(true)
              }}>
                <img src={require('./public/plus.svg')} alt="" />
                <span>添加图片/视频/文件/链接/商品/营销活动</span>
              </div>
            </Popover>
          </Upload>
        </DndProvider>
      </div>
      <Modal
        title='我的图库'
        width={935}
        className={styles.selectModal}
        visible={isModalVisible.imgVisible}
        centered
        destroyOnClose
        onOk={() => {
          // setModalSelected(tempSelected);
          const temp = handleData(tempSelected)
          onChange('imgVisible', {data: temp})
          // setFileList(val => [...val, ...temp])
        }}
        onCancel={() => {
          onChange('imgVisible', null)

        }}>
        <ModalContent
          setModalSelected={setTempSelected}
          env={'yapi'}
          // multiple={false}
        />
      </Modal>
      <Activity visible={isModalVisible.activityVisible} onChange={(data: any) => onChange('activityVisible', data)}/>
      <Goods visible={isModalVisible.goodsVisible} onChange={(data: any) => onChange('goodsVisible', data)}/>
      <UrlLink visible={isModalVisible.urlLinkVisible} onChange={(data: any) => onChange('urlLinkVisible', data)}/>
    </Fragment>
  );
};