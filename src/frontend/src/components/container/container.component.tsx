import { useState } from "react";
import Drawer from "../drawer/drawer.component";
import Header from "../header/header.component";
import './container.component.css';

interface ContainerProps {
    children: React.ReactNode;
    userName?: string;
}

interface ContainerComponent extends React.FC<ContainerProps> {
    Skeleton: React.FC;
}

const Container: ContainerComponent = (props) => {
    const [ isDrawerOpen, setIsDrawerOpen ] = useState(false);
    return (
        <div className="container">
            <Drawer isOpen={isDrawerOpen} onCloseDrawer={() => setIsDrawerOpen(false)} />
            <div className="main-content">
                <Header onToggleDrawerClick={() => setIsDrawerOpen(!isDrawerOpen)} />
                <div className="page-content">
                    {props.children}
                </div>
            </div>
        </div>
    );
};

Container.displayName = 'Container';

Container.Skeleton = () => {
    return (
        <div className="container">
            <div className="main-content">
                <Header onToggleDrawerClick={() => { }} />
                <div className="page-content">
                    <div className="page-content-skeleton"></div>
                </div>
            </div>
        </div>
    );
};

export default Container;
