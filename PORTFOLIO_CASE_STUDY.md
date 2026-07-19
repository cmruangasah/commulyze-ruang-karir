# Portfolio Case Study: CommuLyze Pro (WhatsApp Group Ecosystem Analyzer)

## 📌 Project Overview
**Project Name:** CommuLyze Pro (Behavioral & Ecosystem Analytics)
**Role:** Data Analyst / Community Ops Strategist
**Tech Stack:** React, Vite, Recharts, Lucide-React, Vanilla CSS, Node.js (Data Extraction).

## 🚨 The Problem
Managing a large WhatsApp Community with multiple niche sub-groups (Jobseeker, CV Review, Info Loker, etc.) creates a "blind spot". 
- Are these sub-groups cannibalizing each other? 
- Are the members of Group A exactly the same people as Group B? 
- Who are the "Super Members" driving the community, and who are just passive listeners?
Without API access to WhatsApp, gaining visibility into this cross-pollination behavior was nearly impossible.

## 💡 The Solution
Developed a full-stack analytics pipeline without relying on official APIs:
1. **Data Extraction:** Built a custom JavaScript DOM Scraper (`extractor.js`) to safely pull member phone numbers directly from the WhatsApp Web interface.
2. **Data Processing:** Created a Node.js pipeline (`cleaner.js` & `generate_data.js`) to clean the raw text (removing admin tags, normalizing numbers) and compute complex overlaps across 11 different groups into a structured JSON.
3. **Data Visualization:** Designed a Premium Dark-Mode React Dashboard that translates raw phone numbers into:
   - **Cross-Pollination Matrix:** A heatmap showing the exact percentage of member overlap between any two groups.
   - **Engagement Tiers:** A distribution chart mapping "Casual Members" (1 group) vs "Super Members" (4+ groups).

### ⚠️ Data Limitations & Margin of Error
Since the data extraction relies on DOM scraping rather than a direct API, the methodology carries a minor margin of error (estimated at ±1-3%):
- **Hidden Numbers:** Users with strict WhatsApp privacy settings who hide their phone numbers from non-contacts cannot be fully tracked, slightly skewing overlap metrics.
- **Dynamic Churn:** WhatsApp groups are highly active. Members joining or leaving in the time gap between scraping Group A and Group B could cause minor discrepancies.
- **Number Formatting:** While discrepancies in country codes were largely mitigated via regex normalization in `cleaner.js`, rare edge cases in international formats might slip through.
*Acknowledging this margin of error ensures stakeholders make strategic decisions based on highly reliable macro-trends rather than pixel-perfect counts.*

## 🎯 Business Impact / Positioning
This dashboard serves as the **"Behavioral & Operational Compass"** of the Ruang Karir Ecosystem.
While other dashboards handle Market Research (Surveys) and Chat Sentiment, **CommuLyze Pro** dictates Community Architecture.

**Actionable Outcomes from this project:**
- **Cost/Effort Reduction:** Identified redundant groups with >75% overlap (e.g., Jobseeker & Info Loker). Applying the 80/20 rule, management merged them to prevent audience fatigue and save moderation bandwidth.
- **Targeted Monetization:** Isolated the contact details of "Super Members" (users in 4+ groups) to be used as high-converting leads for premium bootcamp cross-selling.
- **Engagement Strategy:** Revealed the exact percentage of "Passive Listeners" in the main group, triggering a targeted re-engagement campaign.

---
*Note for Portfolio: This project demonstrates the ability to bypass API limitations creatively, transform unstructured text into structured insights, and design C-Level ready dashboards.*
