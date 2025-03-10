# phishing-reporter
Google Workspace add-on to report phishing emails.
From the Gmail toolbar, users are able to report emails a phishing attempts.

![image](https://github.com/user-attachments/assets/e992c4b1-5822-4380-9abf-5afd3a385c5c)

Once reported, emails are moved to trash and forwarded to a custom email address.

---
## Instructions

1. **Install the add-on**:
   - Create a new Google Apps Script project, make the appsscript.json visible from the project settings.
   - Copy the content from [appsscript.json](./appsscript.json) and replace the one in your apps script project.
   - Copy the content from [addon-code.js](./addon-code.js) and paste it in your apps script project.
   - In the code, specify the email address where reports will go to. (variable **const reportTo**)
   - Click on the **Deploy** button in the top-right corner, then choose **Test deployments** → **Install in Gmail**.
   - You’ll see a new button in the Gmail toolbar.

2. **Use the add-on**:
   - Once the add-on is installed, open any email in Gmail.
   - Click on the **Phishing Reporter** button located in the Gmail toolbar.
   - Optionally, provide a **reason** why you believe the email is phishing in the text box that appears.
   - Click the **Report** button to send the email and reason.
   - Once clicked, the email and its attachments will be forwarded to the specified email address and moved to the trash after being reported.

3. **Customize**:
   - You can adapt your appsscript.json with new time zone, scopes, etc.
   - You can modify the **email address** or adjust the add-on functionality as needed in the code.
  
4. **Domain-wide deployment**:
   - Once tested, you can deploy the add-on to the entire organization.
   - Create a GCP project.
   - Link it to the appscript project.
   - Enable necessary APIs (Gmail).
   - Configure Oauth flow and domain-wide delegation for user consent.
   - Publish the add-on privately for domain-wide installation. As an admin, install it.
