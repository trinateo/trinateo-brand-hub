# Test Plan — TrinaTeo Brand Hub

## v1 Success Scenario (manual)

### Visitor submits an enquiry
1. Open `https://trinateo.com` in an incognito browser tab.
2. **Verify:** Homepage loads with Trina's tagline, at least 3 service cards, and at least 1 testimonial. No login prompt.
3. Click a service card → `/services/executive-coaching`.
4. **Verify:** Full service description, "who it's for", outcomes, and "Enquire Now" CTA visible.
5. Click "Enquire Now" → `/contact`.
6. Submit form with: Name="Test CEO", Email="test@example.com", Company="Acme", Role="CEO", Message="I'd like to explore executive coaching.", How Can I Help="Executive Coaching".
7. **Verify:** Confirmation message appears with visitor's name. No redirect to login.
8. Open Supabase table viewer → `enquiries`. **Verify:** New row exists with `status = 'new'` and correct field values.

### Admin marks enquiry reviewed
9. Open `/admin` → passphrase prompt (Sprint 2) or login (Sprint 4).
10. Navigate to Enquiries. **Verify:** The submitted enquiry appears at top, status badge = "new".
11. Click "Mark Reviewed". **Verify:** Status badge changes to "reviewed" without page reload.
12. Hard refresh `/admin/enquiries`. **Verify:** Status still shows "reviewed" (persisted to DB).

## Empty State Tests
- Unpublish all services → `/services` shows: "No services listed yet." (not a blank page or error)
- Empty `speaking_engagements` table → `/speaking` shows: "No speaking events listed yet."

## Error State Tests
- Submit enquiry form with blank name → inline error: "Name is required."
- Submit enquiry form with invalid email → inline error: "Please enter a valid email address."
- Simulate DB timeout in server action → user sees: "Something went wrong. Please try again."

## Security Checks (Sprint 4)
- Open browser DevTools → Network tab → confirm no request contains `service_role` key.
- POST directly to a Supabase write endpoint without a session → confirm 403 / RLS rejection in Supabase logs.
- Open `/admin` in incognito after lock-down sprint → confirm redirect to `/admin/login`.
