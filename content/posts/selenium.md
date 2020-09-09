---
title: Selenium
date: 2020-08-20T02:26:59-07:00
draft: true
---

* [Link to documentation](https://www.selenium.dev/documentation/en/webdriver/driver_requirements/)

* Enable the safari webdriver

```sh
safaridriver --enable
```

* [Link to documentation](https://www.selenium.dev/documentation/en/webdriver/browser_manipulation/)

* Create a webdriver


```py
#Simple assignment
from selenium.webdriver import Safari

driver = Safari()

driver.get('https://google.com')

print(driver.current_url)
```


* Quit the webdriver

```py
driver.quit()
```
