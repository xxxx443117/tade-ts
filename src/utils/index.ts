export enum FACEBOOK_EVENT {
  CLICK_BY_VIDEO = "clickByVideo",
  CLICK_BY_IMAGE = "clickByImage",
  CLICK_BY_POPUP = "clickByPopup",
}

export const fbEvent = (type: FACEBOOK_EVENT) => {
  try {
    if (window.$App) {
      window.$App.fbEvent(type);
    }
  } catch (error) {
    console.error(error);
  }
};

export const openUrl = (url: string) => {
  try {
    if (window.$App) {
      window.$App.openUrl(url);
    }
  } catch (error) {
    window.open(url);
  }
};
