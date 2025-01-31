import { Button, Col, Image, message, Row, Typography } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { getFrontInfo, updateUserClicks } from '../api/user.api';
import { LogoutButton } from '../components/LogoutButton';

const { Title, Paragraph } = Typography;

export function UserPanel() {
    const [frontInfo, setFrontInfo] = useState(null);

    const [clicks, setClicks] = useState({
        button_clicks_1: 0,
        button_clicks_2: 0
    });

    useEffect(() => {
        const fetchFrontInfo = async () => {
            const data = await getFrontInfo();
            if (data) {
                setFrontInfo(data[0]);
            }
        };
        fetchFrontInfo();

        const userId = localStorage.getItem('user_id');
        const accessToken = localStorage.getItem('access_token');

        if (userId && accessToken) {
            axios.get(`http://localhost:8000/api/users/${userId}/`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                withCredentials: true,
            })
                .then((response) => {
                    if (response.data) {
                        setClicks({
                            button_clicks_1: response.data.button_clicks_1 || 0,
                            button_clicks_2: response.data.button_clicks_2 || 0
                        });
                    }
                })
        }
    }, []);

    const handleButtonClick1 = () => {
        setClicks((prevClicks) => {
            const newClicks = { ...prevClicks, button_clicks_1: prevClicks.button_clicks_1 + 1 };
            updateUserClicks(newClicks);
            return newClicks;
        });
    };

    const handleButtonClick2 = () => {
        setClicks((prevClicks) => {
            const newClicks = { ...prevClicks, button_clicks_2: prevClicks.button_clicks_2 + 1 };
            updateUserClicks(newClicks);
            return newClicks;
        });
    };
    if (!frontInfo) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="user-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '90vh' }}>
            <Row justify="center" align="middle" style={{ marginBottom: '20px', width: '100%' }}>
                <Col style={{ display: 'flex', justifyContent: 'center' }}>
                    <Image
                        src={frontInfo.image}
                        alt="Logo React"
                        preview={false}
                        style={{
                            width: '120px',
                            height: 'auto',
                        }}
                    />
                </Col>
                <Col style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: '20px' }}>
                    <Title level={2} style={{ color: '#FFFFFF'}}>{frontInfo.title}</Title>
                    <Paragraph style={{ color: '#FFFFFF', maxWidth: '500px', wordWrap: 'break-word' }}>
                                {frontInfo.description}
                            </Paragraph>
                </Col>
            </Row>
            <Row justify="center" align="middle" gutter={16} style={{ flexGrow: 1 }}>
                <Col span={5}>
                    <Button
                        onClick={handleButtonClick1}
                        type="primary"
                        style={{ margin: '10px', width: '100%' }}
                    >
                        Botón 1
                    </Button>
                </Col>
                <Col span={5}>
                    <Button
                        onClick={handleButtonClick2}
                        type="primary"
                        style={{ margin: '10px', width: '100%' }}
                    >
                        Botón 2
                    </Button>
                </Col>
            </Row>
            <Row justify="center" style={{ marginTop: '20px' }}>
                <Col>
                    <LogoutButton />
                </Col>
            </Row>
        </div>
    );
}