import { Col, message, Row, Table, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis, YAxis
} from 'recharts';
import { getAllusers } from '../api/adminPanel.api';
import { LogoutButton } from '../components/LogoutButton';

const { Title } = Typography;

export function AdminPanel() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getAllusers();
                if (response) {
                    const filteredUsers = response.filter(user => user.role === 0);
                    setUsers(filteredUsers);
                } else {
                    message.error('Error al obtener los usuarios');
                }
            } catch (error) {
                message.error('Hubo un error al obtener los usuarios');
            }
        };

        fetchUsers();
    }, []);

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Inicio de sesión',
            dataIndex: 'last_login',
            key: 'last_login',
            render: (text) => new Date(text).toLocaleString(),
            sorter: (a, b) => new Date(a.last_login) - new Date(b.last_login),
        },
        {
            title: 'Tiempo',
            dataIndex: 'session_duration',
            key: 'session_duration',
            render: (text) => {
                if (text === null) {
                    return '00:00:00 segundos';
                }
                return `${text} segundos`;
            },
            sorter: (a, b) => a.session_duration - b.session_duration,
        },
        {
            title: 'Botón 1',
            dataIndex: 'button_clicks_1',
            key: 'button_clicks_1',
            sorter: (a, b) => a.button_clicks_1 - b.button_clicks_1,
        },
        {
            title: 'Botón 2',
            dataIndex: 'button_clicks_2',
            key: 'button_clicks_2',
            sorter: (a, b) => a.button_clicks_2 - b.button_clicks_2,
        },
    ];

    const barData = users
        .filter(user => user.button_clicks_1 > 0 || user.button_clicks_2 > 0)
        .map(user => ({
            name: user.name,
            clicks1: user.button_clicks_1,
            clicks2: user.button_clicks_2,
        }))
        .sort((a, b) => (b.clicks1 + b.clicks2) - (a.clicks1 + a.clicks2))
        .slice(0, 5);

    const pieData = [
        { name: 'Botón 1', value: users.reduce((acc, user) => acc + user.button_clicks_1, 0) },
        { name: 'Botón 2', value: users.reduce((acc, user) => acc + user.button_clicks_2, 0) },
    ];

    const convertToSeconds = (timeString) => {
        const [hours, minutes, seconds] = timeString.split(':').map(Number);
        return hours * 3600 + minutes * 60 + seconds;
    };

    const timeData = users
        .filter(user => user.session_duration > '00:00:00')
        .map(user => ({
            name: user.name,
            time: convertToSeconds(user.session_duration),
        }))
        .sort((a, b) => b.time - a.time)
        .slice(0, 5);
        
    const COLORS = ['#0088FE', '#00C49F'];

    const CustomTooltip = ({ active, payload, label, unit }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '5px', border: '1px solid #ccc' }}>
                    <p className="label">{`${label}`}</p>
                    {payload.map((entry, index) => (
                        <p key={`item-${index}`} style={{ color: entry.color }}>
                            {`${entry.name} : ${entry.value} ${unit}`}
                        </p>
                    ))}
                </div>
            );
        }

        return null;
    };

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return `${text.substring(0, maxLength)}...`;
        }
        return text;
    };

    return (
        <div style={{ padding: '20px' }}>
            <Row justify="space-between" align="middle" style={{ marginBottom: '20px' }}>
                <Col span={20} style={{ textAlign: 'center' }}>
                    <Title level={2} style={{ color: '#FFFFFF' }}>Panel de Administración</Title>
                </Col>
                <Col span={4} style={{ textAlign: 'right' }}>
                    <LogoutButton />
                </Col>
            </Row>
            <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
                <Table columns={columns} dataSource={users} rowKey="id" className="custom-table" />
            </div>
            <Row justify="center" align="middle" style={{ marginTop: '20px' }} gutter={[16, 16]}>
            <Col span={7}>
                    <div style={{ backgroundColor: '#FFFFFF', padding: '10px', borderRadius: '8px' }}>
                        <Title level={4} style={{ textAlign: 'center' }}>Top 5 Tiempo por Usuario (segundos)</Title>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={timeData} layout="vertical" margin={{ left: 30 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" />
                                <YAxis dataKey="name" type="category"/>
                                <Tooltip content={<CustomTooltip unit="segundos" />} />
                                <Legend />
                                <Bar dataKey="time" name="Tiempo (s)" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Col>
                <Col span={7}>
                    <div style={{ backgroundColor: '#FFFFFF', padding: '10px', borderRadius: '8px' }}>
                        <Title level={4} style={{ textAlign: 'center' }}>Distribución de Clicks</Title>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value) => `${value} clics`} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </Col>
                <Col span={7}>
                    <div style={{ backgroundColor: '#FFFFFF', padding: '10px', borderRadius: '8px' }}>
                        <Title level={4} style={{ textAlign: 'center' }}>Top 5 Clicks por Usuario</Title>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={barData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" tickFormatter={(text) => truncateText(text, 5)} />
                                <YAxis />
                                <Tooltip content={<CustomTooltip unit="clics" />} />
                                <Legend />
                                <Bar dataKey="clicks1" name="Botón 1" fill="#8884d8" />
                                <Bar dataKey="clicks2" name="Botón 2" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Col>
            </Row>
        </div>
    );
}