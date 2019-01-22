## Contributing Guidelines

Pull Requests are accepted.

### Adding New Sites
#### 1. Add Site to the json file with the required `fields`

    ```
    "SiteName": {
        "url": "http://example.com/{}",
        "urlMain": "http://example.com/",
        "errorType": "status_code/message",
        "errorMsg": "loading...",
        "minChar": 2
    },
    ```
**1. url**: username url ( `{}` will be replaced with original username during runtime)

**2. urlMain**: original website url

**3. errorType**: Type of error when user is not found

**4. errorMsg**: Error message when `errorType` is `message` 
   - (Optional for `errorType: "status_code"`)
    
**5. minChar**: Minimum number of characters for username
<hr>

#### 2. Add to `index.html`
Use template:

  - if fontawesome icon available: 
    ```
    <div class="col-md-1 col-2 social__site--content">
        <div class="card social__site--card">
            <a href="#" target="_blank" rel="noopener" class="social__site--link text-center" id="SiteName">
                <i class="fab fa-SiteName"></i>
            </a>
            <div class="card-body social__title--holder">
                <h5 class="social__site--title">SiteName</h5>
            </div>
        </div>
    </div>
    ```

  - If not
    ```
    <div class="col-md-1 col-2 social__site--content">
        <div class="card social__site--card">
            <a href="#" target="_blank" rel="noopener" class="social__site--link text-center" id="SiteName">
                <p class="social__logo--text py-2-5 my-1">SiteName</p>
            </a>
            <div class="card-body social__title--holder">
              <h5 class="social__site--title">Imgur</h5>
            </div>
        </div>
    </div>
    ```
