import AnimationCSS from './styles/animation.module.css'

export const Animation = () => {
    return (
        <div className={AnimationCSS.animationContainer}>
            <div className={AnimationCSS.animationLoading}></div>
            <div
                className={AnimationCSS.animationLoading__two}
            ></div>
        </div>
    )
}

