import { CodeSandboxCircleFilled } from '@ant-design/icons';

function LogoAndName(){
    return(
        <div className="logo">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent:'center',marginBottom:'10px' }}>
                <CodeSandboxCircleFilled style={{ fontSize: '45px', color: '#08c' }} />
                <p style={{fontSize:'25px', margin: '0', marginLeft: '10px', fontFamily:'Chewy'}}>REMAN</p>
            </div>
        </div>
    );
}


export default LogoAndName;