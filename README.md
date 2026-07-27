# Her birthday site

Five files. Put them all in one GitHub repository, turn on Pages, done.

```
index.html      the site
style.css       the look
app.js          the moving parts
content.json    every word and photo on the page
admin.html      the editor (only you use this)
```

---

## 1. Put it online (about five minutes)

1. Go to **github.com** → **New repository**. Call it something like `for-her` or `august-third`. Set it **Public** (Pages needs public on a free account) and create it.
2. On the new repo page click **uploading an existing file**, drag in all five files, then **Commit changes**.
3. Go to **Settings** → **Pages**. Under *Build and deployment* set **Source: Deploy from a branch**, **Branch: main**, folder **/ (root)**, then **Save**.
4. Wait a minute, then open:
   `https://YOUR-USERNAME.github.io/YOUR-REPO/`

The editor lives at `.../admin.html` — bookmark that one.

---

## 2. Make the editor able to publish

The editor needs one token so it can save changes back to GitHub.

1. GitHub → click your avatar → **Settings** → scroll down to **Developer settings** → **Personal access tokens** → **Fine-grained tokens** → **Generate new token**.
2. Name it `birthday site`. Expiry: whatever you like.
3. **Repository access** → *Only select repositories* → pick the repo you just made.
4. **Permissions** → *Repository permissions* → find **Contents** → set to **Read and write**.
5. Generate, then copy the token (it is only shown once).
6. Open `admin.html`, paste the username, repo name and token into *GitHub connection*, and tick **Remember on this device**.

The token stays in your browser. It is never written into the site, so nobody who visits can see it or change anything.

---

## 3. Adding photos later

Open `admin.html`, drag photos into the box, write a caption under each, press **Publish to GitHub**. Photos are shrunk automatically before upload, so drop in the full-size originals. The wheel on the front page picks up however many you add.

Blank frames show a small gold line drawing instead of a photo — handy as placeholders, and fine to delete.

Everything else on the page is editable in there too: her name, the letter behind the wax seal, the twenty-six reasons, the timeline, the candle lines, the footer.

If you would rather not use a token, press **Download content.json instead** and upload that file to the repo by hand — but photos need the token, since they have to be uploaded as files.

---

## The seal

It ships **sealed**. Until the moment you set, anyone opening the link sees her name, the countdown and nothing else — no letter, no photos, no reasons. At the appointed second it opens itself, gold dust and all, even if she already has the page sitting open in front of her.

It runs on **her** clock, wherever she is. Midnight on the 3rd where she is standing.

In the editor, under *The seal*:

- **Keep everything sealed until it opens** — the on/off switch. Currently on, set to open at midnight on 3 August.
- **Opens on / At** — change it to 8pm over dinner, or whenever suits.
- **Line shown while it is sealed** — what she reads under her name in the meantime.

**Preview site** at the top of the editor adds `?preview` to the address, which shows you the whole thing regardless. Use that link to check your work; send her the plain one.

Worth being straight about: this hides the page, it does not encrypt it. The words live in `content.json` in a public repo, so anyone who thought to look there could read them early. She would have to be actively snooping through GitHub to find it. If you would rather it were properly locked, say the word and I will put it behind a passphrase you tell her on the day — that one is real encryption, not a curtain.

## Music (optional)

Open the editor, drop the song into the box under *The candle and the music*, then press **Publish to GitHub**. It gets uploaded with everything else — you never need to touch GitHub yourself. A small Play button then appears bottom right on the site. It never autoplays; browsers block that anyway.

Only use a track you own a copy of, and keep the link to yourself.

Notes:

- mp3, m4a, wav and ogg work. A Spotify, YouTube or Apple Music link will not — those are web pages, not audio files.
- Keep it under about 8 MB, or it is a slow download on mobile data. A 128 kbps mp3 of a four-minute song is roughly 4 MB.
- The song is **not** kept when you press *Save draft here* — too big for that. If you pick a file, publish before closing the tab.
- **Remove the song** clears it, and publishing after that takes the button off the site.

If the button on the site shows something other than your label, it is telling you what went wrong:

| It says | What it means |
| --- | --- |
| Needs an audio file | The link is a streaming page rather than a file. |
| Track not found at that path | The upload has not gone through yet, or the capitals do not match. `Music/Song.mp3` and `music/song.mp3` are different files to GitHub. |
| That file will not decode | Wrong format. Re-save as a plain mp3. |
| Tap once more | The browser wanted a second tap before allowing sound. Nothing is broken. |

On an iPhone, check the silent switch too.

## Worth knowing

- The site is marked **noindex**, so it will not turn up in Google searches. Anyone with the link can still open it, so just don't share the link.
- Same for `admin.html` — visible, but useless without your token.
- Works on phones, keyboard-friendly, and it respects the "reduce motion" setting for anyone who gets motion sick.
- The countdown reads the visitor's own clock, so on 3 August it flips to birthday mode wherever she is.
- Want a nicer address? **Settings → Pages → Custom domain** if you have a spare domain.
