import { IRouteComponentProps } from 'umi'
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider  } from "antd";
import 'antd/dist/antd.css';

export default function Layout({ children, location, route, history, match }: IRouteComponentProps) {
  return <div>
       <ConfigProvider locale={zhCN}>
        {children}
       </ConfigProvider>
  </div>
}