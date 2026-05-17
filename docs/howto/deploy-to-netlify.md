# How to deploy the site to Netlify

**Type**: How-To — follow these steps to get the site live.
**Audience**: Daniel, deploying for the first time.
**Time**: ~20 minutes end-to-end.

---

## Prerequisites

- The repository is pushed to GitHub (or GitLab/Bitbucket).
- You have a Netlify account (free tier is sufficient).
- The current branch (`main`) has the `netlify.toml` committed — it configures build command and publish directory automatically.

---

## 1. Connect the repository

1. Log in at [app.netlify.com](https://app.netlify.com).
2. Click **Add new site → Import an existing project**.
3. Choose **GitHub** and authorise Netlify if prompted.
4. Search for and select the `daedaluscoaching.com` repository.

---

## 2. Confirm build settings

Netlify reads `netlify.toml` automatically. Verify the pre-populated values match before clicking Deploy:

| Setting           | Expected value                    |
| ----------------- | --------------------------------- |
| Build command     | `pnpm run generate`               |
| Publish directory | `.output/public`                  |
| Node version      | `22` (from `[build.environment]`) |

If any field is blank or wrong, correct it here. Do not add a Functions directory — the site is fully static.

Click **Deploy site**.

---

## 3. Wait for the first deploy

The first build takes 2–4 minutes. Watch the build log for:

```text
✔ Generated public .output/public
```

A failed build almost always means a missing dependency or a type error. If it fails, click **View deploy log** and search for `Error:` to find the root cause.

---

## 4. Verify Netlify Forms detection

During the first successful deploy, Netlify crawls the static HTML and registers any form marked `data-netlify="true"`. The contact form at `/contact` carries this attribute.

To confirm detection:

1. In the Netlify dashboard, go to **Site → Forms**.
2. You should see a form named **contact** listed.

If it is not listed, the crawl did not find the form. This usually means the first build failed or the form HTML was not pre-rendered. Trigger a fresh deploy (**Deploys → Trigger deploy → Deploy site**) and check again.

> The form must appear here before the contact form submission will work in production. Netlify Forms does not register forms dynamically at runtime.

---

## 5. Set a custom domain (optional, do now if going live)

1. Go to **Domain management → Add a domain**.
2. Enter your domain (e.g. `daedaluscoaching.com`).
3. Follow the DNS instructions. Netlify provisions an SSL certificate automatically via Let's Encrypt once DNS propagates.

You can skip this and use the Netlify subdomain (`<random>.netlify.app`) for testing.

---

## 6. Validate the contact form on a preview deploy

Before going live, confirm the JS-enhanced submission path works end-to-end against a real Netlify environment.

### What you're testing

The `submit()` function in `useContact.ts` posts to `/contact` using `application/x-www-form-urlencoded` with `form-name=contact`. Netlify intercepts this and records the submission in **Site → Forms**. This path does not exist in the local dev server — you must test it on a real Netlify deploy.

### Steps

1. Push a branch to GitHub. Netlify automatically creates a preview deploy at a URL like `https://deploy-preview-N--<site>.netlify.app`.
2. Open the preview URL in a browser (JavaScript enabled).
3. Navigate to `/contact`.
4. Fill in all fields with real-looking test data:
   - Name: `Test Submission`
   - Email: `test@example.com`
   - Message: `This is a preview deploy test.`
5. Click **Send message**.
6. You should see the confirmation message ("Thank you" or similar) appear on the page.
7. In the Netlify dashboard, go to **Site → Forms → contact**.
8. You should see the test submission listed there with your field values.

### What a failure looks like

| Symptom                                       | Likely cause                                                                                           |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Button stays in "Sending…" state indefinitely | Network request failed — open DevTools → Network, filter by `/contact` POST, check the response status |
| 404 on the POST request                       | The form was not detected in step 4 — retrigger a deploy                                               |
| 200 response but no entry in Forms dashboard  | `form-name` field missing or malformed — check `useContact.ts` `body` construction                     |
| Spam filter rejection                         | Netlify's spam filter blocked it — check the **Spam** tab in Forms dashboard                           |

---

## 7. Enable form notifications (recommended)

By default, Netlify stores submissions silently. To receive an email for each enquiry:

1. Go to **Site → Forms → contact → Form notifications**.
2. Click **Add notification → Email notification**.
3. Enter `daniel@daedaluscoaching.com` as the recipient.
4. Save.

Submit the test form again to confirm you receive the notification email.

---

## Done

The site is deployed and the contact form is live. Future pushes to `main` trigger automatic redeploys — no manual action required.
