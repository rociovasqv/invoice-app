import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import TablaSublientesComp from "../../components/TablaSubclientes";


const SubclientesPage = ()=>
{
    const { id } = useParams();
    return(
        <Container fluid>
            <TablaSublientesComp idCliente={id}/>
        </Container>
    )
}
export default SubclientesPage;
