import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';
import * as S from "./WaterTemp.style";

function WaterTemp() {
    const [tempData, setTempData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWaterTemp = async () => {
            try {
                const response = await axios.get('https://api.allorigins.win/get', {
                params: {
                    url: 'https://api.hangang.msub.kr/',
                },
                });
                const data = JSON.parse(response.data.contents);
                setTempData(data);
            } catch (error) {
                setError('데이터를 불러오는 데 실패했습니다.');
                console.error('Error fetching water temperature data:', error);
            }
        };
    
        fetchWaterTemp(); // 초기 데이터 가져오기
    
        const interval = setInterval(() => {
        fetchWaterTemp(); // 일정 시간마다 데이터 갱신
        }, 60000); // 60000밀리초 = 1분
    
        return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 정리
    }, []);

    if (!tempData && !error) {
        return <LoadingSpinner />;
    }

    return (
        <S.Group>
            <S.Title>현재 한강 물 온도</S.Title>
            <S.SubText>측정 시간: {tempData.time}</S.SubText>
            <S.SubText>{tempData.temp}°C</S.SubText>
        </S.Group>
    );
    }

export default WaterTemp;
