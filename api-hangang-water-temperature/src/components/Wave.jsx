import React, { useRef, useEffect } from "react";

const Wave = () => {
    const canvasRef = useRef(null);
    const waveHeight = 50; // 기본 물결의 높이
    const waveLength = 0.02; // 물결의 길이
    // const waveSpeed = 0.05; // 물결의 이동 속도
    const waveAmplitudeSpeed = 0.03; // 진폭 변화 속도
    let phase = 0; // 물결의 애니메이션 단계
    let amplitudePhase = 0; // 진폭 변화 단계

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        // 캔버스 크기 설정
        canvas.width = window.innerWidth;
        canvas.height = 300;

        const drawWave = () => {
            // 캔버스를 지우기
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 배경 색상 설정
            ctx.fillStyle = "#f0f8ff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // 진폭을 시간에 따라 변화시킴
            const dynamicHeight =
                waveHeight + 20 * Math.sin(amplitudePhase);

            // 물결 그리기
            ctx.beginPath();
            ctx.moveTo(0, canvas.height / 2);

            for (let x = 0; x < canvas.width; x++) {
                const y =
                    canvas.height / 2 +
                    dynamicHeight * Math.sin(x * waveLength + phase);
                ctx.lineTo(x, y);
            }

            ctx.strokeStyle = "#0077ff";
            ctx.lineWidth = 2;
            ctx.stroke();

            // 애니메이션 단계 업데이트
            // phase += waveSpeed;
            amplitudePhase += waveAmplitudeSpeed;

            // 애니메이션 반복
            requestAnimationFrame(drawWave);
        };

        // 애니메이션 시작
        drawWave();
    }, []);

    return <canvas ref={canvasRef} style={{ display: "block" }} />;
};

export default Wave;
