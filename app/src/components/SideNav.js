import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import {
    CDBSidebar,
    CDBSidebarHeader,
    CDBSidebarContent,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';
import './css/navigation.css';

function SideNav() {

    return (
        <div id='sideBar'>
            <CDBSidebar textColor="#fff" backgroundColor="#333" breakpoint={768} >
                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                </CDBSidebarHeader>
                <CDBSidebarContent className="sidebar-content">
                    <Container>
                        <CDBSidebarMenu>
                            <LinkContainer to="/dashboard" >
                                <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
                            </LinkContainer>
                            <LinkContainer to="/studies">
                                <CDBSidebarMenuItem icon="table">Studies</CDBSidebarMenuItem>
                            </LinkContainer>
                            <LinkContainer to="/newstudy">
                                <CDBSidebarMenuItem icon="plus">New Study</CDBSidebarMenuItem>
                            </LinkContainer>
                            <LinkContainer to="/infoPackCL">
                                <CDBSidebarMenuItem icon="clipboard">Info Pack Checklist</CDBSidebarMenuItem>
                            </LinkContainer>
                            <LinkContainer to="/irasReview">
                                <CDBSidebarMenuItem icon="clipboard">IRAS Review</CDBSidebarMenuItem>
                            </LinkContainer>
                            <LinkContainer to="/upload">
                                <CDBSidebarMenuItem icon="upload">Upload File</CDBSidebarMenuItem>
                            </LinkContainer>
                            <LinkContainer to='/researcher'>
                                <CDBSidebarMenuItem icon="user">Researchers</CDBSidebarMenuItem>
                            </LinkContainer>
                        </CDBSidebarMenu>
                    </Container>
                </CDBSidebarContent>
            </CDBSidebar>
        </div>
    );

}

export default SideNav;

/*
<LinkContainer to="/users">
                                <CDBSidebarMenuItem icon="user">Users</CDBSidebarMenuItem>
                            </LinkContainer>
                            */