import { useEffect, useState } from 'react';
import DividerMobile from './assets/pattern-divider-mobile.svg';
import DividerDesktop from './assets/pattern-divider-desktop.svg';
import Dice from './assets/icon-dice.svg';
import styled from 'styled-components';

function App() {
    const [advice, setAdvice] = useState({ slipSet: false });

    useEffect(() => {
        newAdvice().then((advice) => setAdvice(advice));
    }, []);

    return (
        <div className='bg-[#202733] w-screen h-screen flex justify-center items-center'>
            {advice.slipSet && (
                <div className='w-full mx-4 pt-10 px-6 bg-[#313A48] rounded-[10px] text-[#CEE3E9] manrope relative max-w-[540px] md:pt-12 md:px-12'>
                    <div className='text-[11px] tracking-[3.46px] text-center text-[#53FFAA] pb-6 md:text-[13px]'>
                        ADVICE #{advice.advice['id']}
                    </div>

                    <p className='text-[24px] tracking-[-0.26px] pb-6 text-center md:text-[28px]'>
                        “{advice.advice.advice}”
                    </p>

                    <img
                        src={DividerMobile}
                        alt='divider'
                        className='w-full pb-[32px] md:hidden'
                    />
                    <img
                        src={DividerDesktop}
                        alt='divider'
                        className='w-full pb-[40px] hidden md:block'
                    />

                    <div className='flex justify-center'>
                        <DiceButton
                            className='w-16 h-16 rounded-full bg-[#53FFAA] flex justify-center items-center mb-[-32px]'
                            onClick={() =>
                                newAdvice().then((advice) => setAdvice(advice))
                            }>
                            <img src={Dice} alt='dice' />
                        </DiceButton>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;

async function newAdvice() {
    const res = await fetch('https://api.adviceslip.com/advice');
    const advice = await res.json();
    return {
        slipSet: true,
        advice: advice['slip'],
    };
}

const DiceButton = styled.button`
    &:hover {
        box-shadow: 0 0 40px 0 #53ffaa;
    }
`;
