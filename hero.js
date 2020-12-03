
const Input = {};
cc.Class({
	extends: cc.Component,

	properties: {

	},
	onLoad() {
		this._speed = 200;
		this.sp = cc.v2(0, 0);
		this.state = '';
		this.heroAni = this.node.getComponent(cc.Animation);
		cc.systemEvent.on('keydown', this.onKeydown, this);
		cc.systemEvent.on('keyup', this.onKeyup, this);
	},
	setState(state) {
		if (this.state == state) return;
		this.state = state;
		this.heroAni.play(this.state);
    },
	onKeydown(e) {
		Input[e.keyCode] = 1;

	},
	onKeyup(e) {
		Input[e.keyCode] = 0;
	},
	update(dt) {
		if (Input[cc.macro.KEY.a] || Input[cc.macro.KEY.left]) {
			this.sp.x = -1;
		}
		else if (Input[cc.macro.KEY.d] || Input[cc.macro.KEY.right]) {
			this.sp.x = 1;
		}
		else {
			this.sp.x = 0;
        }
		if (Input[cc.macro.KEY.w] || Input[cc.macro.KEY.up]) {
			this.sp.y = 1;
		}
		else if (Input[cc.macro.KEY.s] || Input[cc.macro.KEY.down]) {
			this.sp.y = -1;
		}
		else {
			this.sp.y = 0;
		}

		this.lv = this.node.getComponent(cc.RigidBody).linearVelocity;

		if (this.sp.x) {
			this.lv.y = 0;
			this.lv.x = this.sp.x * this._speed;
		}
		else if (this.sp.y) {
			this.lv.x = 0;
			this.lv.y = this.sp.y * this._speed;
		}
		else {
			this.lv.x = 0;
			this.lv.y = 0;
		}
		this.node.getComponent(cc.RigidBody).linearVelocity = this.lv;
		let state = '';
		if (this.sp.x == 1) {
			state = 'hero_right';
		} else if (this.sp.x == -1) {
			state = 'hero_left';
		} else if (this.sp.y == 1) {
			state = 'hero_up';
		} else if (this.sp.y == -1) {
			state = 'hero_down';
        }
		if (state) {
			this.setState(state);
        }
	},

});
