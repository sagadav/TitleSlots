class Animations {
    animations = [];
    /**
     * plays animations
     * @param animation name
     * @param args. Needs for callback
     */
    setAnimation(animation, args = {}) {
        for(const item of this.animations) {
            item.play = false
        }
        const Animation = this.animations.find(item => item.name === animation);
        if(!Animation) return;
        Animation.play = true;
        Animation.callback(args)
    };

    /**
     * @param animation name
     */
    isPlay(animation) {
        return this.animations.find(item => item.name === animation).play
    }

    /**
     * add animation to animationArray
     * @param name
     * @param callback
     */
    createAnimation(name, callback) {
        this.animations.push({
            play: false,
            name,
            callback,
        })
    }
}
export default Animations