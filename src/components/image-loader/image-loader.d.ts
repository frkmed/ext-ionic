import { Platform } from 'ionic-angular';
import { ImageLoaderConfig } from "./image-loader-config";
export declare class ImageLoaderController {
    private config;
    private isCacheReady;
    private isInit;
    constructor(platform: Platform, config: ImageLoaderConfig);
    getImagePath(imageUrl: string): Promise<string>;
    private needDownload(imageUrl);
    private downloadImage(imageUrl, localPath);
    private initCache(replace?);
    private getCachedImagePath(url);
    private throwError(error);
    private throwWarning(error);
    private readonly filePluginExists;
    private readonly cacheDirectoryExists;
    private createCacheDirectory(replace?);
    private createFileName(url);
    private hashString(string);
}
