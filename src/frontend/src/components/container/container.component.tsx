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
    const currentLocation = window.location.pathname;
    return (
        <div className="container">
            <Drawer />
            <div className="main-content">
                <Header currentRoute={currentLocation} userName={props.userName} onToggleDrawerClick={() => { }} />
                <div className="page-content">
                    {props.children}
                </div>
            </div>
        </div>
    );
};

Container.displayName = 'Container';

Container.Skeleton = () => {
    const currentLocation = window.location.pathname;
    return (
        <div className="container">
            <div className="main-content">
                <Header currentRoute={currentLocation} onToggleDrawerClick={() => { }} />
                <div className="page-content">
                    <div className="page-content-skeleton"></div>
                </div>
            </div>
        </div>
    );
};

export default Container;
