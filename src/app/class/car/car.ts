export class Car {
    speed: number;
    x: number;
    y: number;
    imgSrc: HTMLImageElement;

    constructor(x: number, y: number, autoNumero: number) {
        this.x = x;
        this.y = y;

        this.imgSrc = new Image();
        switch (autoNumero) {
            case 1:
                this.speed = 150;
                this.imgSrc.src = "../../../assets/autos/auto1.png";
                break;
            case 2:
                this.speed = 170;
                this.imgSrc.src = "../../../assets/autos/auto2.png";
                break;
            case 3:
                this.speed = 200;
                this.imgSrc.src = "../../../assets/autos/auto3.png";
                break;
            case 4:
                this.speed = 250;
                this.imgSrc.src = "../../../assets/autos/auto4.png";
                break;
            case 5:
                this.speed = 300;
                this.imgSrc.src = "../../../assets/autos/auto5.png";
                break;
            default:
                this.speed = 150;
                this.imgSrc.src = "../../../assets/autos/auto1.png";
        }
    }
}
