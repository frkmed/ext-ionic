import { ElementRef, Renderer, OnInit } from '@angular/core';
import { ImageLoaderController } from './image-loader';
import { ConfigProvider } from '../../config/config';
export declare class ImageLoaderCmp implements OnInit {
    private element;
    private renderer;
    private imageLoader;
    private config;
    imageUrl: string;
    fallbackUrl: string;
    spinner: boolean;
    useImg: boolean;
    width: string;
    height: string;
    display: string;
    backgroundSize: string;
    backgroundRepeat: string;
    isLoading: boolean;
    constructor(element: ElementRef, renderer: Renderer, imageLoader: ImageLoaderController, config: ConfigProvider);
    ngOnInit(): void;
    private setImage(imageUrl);
}
