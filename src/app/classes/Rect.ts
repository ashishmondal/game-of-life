export class Rect {
	public left: number;
	public right: number;
	public top: number;
	public bottom: number;

	constructor(public x: number, public y: number, public width: number, public height: number) {
		this.left = x;
		this.top = y;
		this.right = x + width;
		this.bottom = y + height;
	}

	public contains(x: number, y: number): boolean {
		return x >= this.left && x <= this.right && y >= this.top && y <= this.bottom;
	}
}