# Feature: Warm Referral Journey
# feature_id: daedalus-coaching-website-redesign
# wave: DISTILL
# driving_port: Browser (Playwright) → Nuxt SSG pages
# journey: journey-warm-referral.yaml
#
# A leader has been given the site URL by a trusted colleague. They have 60-90
# seconds before a meeting. This feature file captures their complete journey from
# first load to enquiry submission.

Feature: Warm referral visitor assesses the coach and submits an enquiry

  Background:
    Given the coaching website is available

  # -------------------------------------------------------------------------
  # Walking Skeletons — thin E2E slices proving observable user value
  # -------------------------------------------------------------------------

  @walking_skeleton @driving_port
  Scenario: Referred visitor arrives, reads the site, and sends an enquiry
    Given a visitor has been given the coaching website address by a colleague
    When the visitor opens the homepage
    Then the visitor sees the coach's name and an opening statement about leadership
    And the visitor can see the credentials section without scrolling
    And the visitor can reach the contact form from the homepage
    When the visitor fills in their name, email address, and a short message
    And the visitor sends the enquiry
    Then the visitor sees a confirmation that their message has been received

  @walking_skeleton @driving_port
  Scenario: Referred visitor assesses the coach's approach before deciding to make contact
    Given a visitor has been given the coaching website address by a colleague
    When the visitor opens the about page
    Then the visitor sees a heading on the about page
    And the visitor can read the coach's approach to working with leaders
    When the visitor navigates to the contact page
    Then the visitor sees an enquiry form ready to fill in

  @walking_skeleton @driving_port
  Scenario: Referral partner checks the site before recommending it to a senior leader
    Given a referral partner is about to share the coaching website with a high-value contact
    When the referral partner opens the homepage
    Then credentials are visible on the page
    And the site communicates a clear professional register within the first section

  # -------------------------------------------------------------------------
  # Navigation — all pages reachable from any page
  # -------------------------------------------------------------------------

  @driving_port
  Scenario: Visitor reaches every main page from the site navigation
    Given a visitor is on the homepage
    When the visitor selects "About" from the navigation
    Then the visitor is on the about page
    When the visitor selects "Services" from the navigation
    Then the visitor is on the services page
    When the visitor selects "Systems" from the navigation
    Then the visitor is on the systems page
    When the visitor selects "Contact" from the navigation
    Then the visitor is on the contact page

  @driving_port
  Scenario: Visitor can return to the homepage from any page
    Given a visitor is on the about page
    When the visitor selects the site logo in the header
    Then the visitor is back on the homepage

  # -------------------------------------------------------------------------
  # Homepage — trust-first information architecture
  # -------------------------------------------------------------------------

  @driving_port
  Scenario: Homepage presents the coach's opening statement above the fold
    Given a visitor opens the homepage
    Then the visitor sees the coach's name in the page heading
    And the visitor sees an opening statement about leadership on first load

  @driving_port
  Scenario: Homepage offers a clear path to make contact
    Given a visitor has read the homepage and is ready to get in touch
    When the visitor looks for a way to contact the coach
    Then the visitor sees a link that leads to the contact form

  # -------------------------------------------------------------------------
  # About page — coach's voice and approach
  # -------------------------------------------------------------------------

  @driving_port
  Scenario: About page communicates the coach's distinct approach
    Given a visitor wants to understand how the coach works
    When the visitor opens the about page
    Then the visitor sees a page heading
    And the visitor reads prose that describes the coach's approach

  # -------------------------------------------------------------------------
  # Services page — how the coach works
  # -------------------------------------------------------------------------

  @driving_port
  Scenario: Visitor reads about the coaching services offered
    Given a visitor wants to understand what the coach offers
    When the visitor opens the services page
    Then the visitor sees a heading describing the services
    And the visitor can read content that describes how the coach works

  # -------------------------------------------------------------------------
  # Trust signals — credentials visible above fold
  # -------------------------------------------------------------------------

  @driving_port
  Scenario: Trust signals section is present on the homepage for every visitor
    Given a visitor opens the homepage
    Then the visitor sees a credentials section on the page

  @driving_port
  Scenario: B-Corp certification is shown to visitors as a trust signal
    Given the B-Corp certification flag is enabled
    When a visitor opens the homepage
    Then the visitor sees the B-Corp certification in the credentials section

  @driving_port
  Scenario: 1% for the Planet membership is shown to visitors as a trust signal
    Given the 1% for the Planet membership flag is enabled
    When a visitor opens the homepage
    Then the visitor sees the 1% for the Planet membership in the credentials section

  @driving_port
  Scenario: Professional accreditations are shown to visitors as trust signals
    Given professional accreditation flags are enabled
    When a visitor opens the homepage
    Then the visitor sees the professional accreditations in the credentials section

  # -------------------------------------------------------------------------
  # Contact form — happy path
  # -------------------------------------------------------------------------

  @driving_port
  Scenario: Visitor reaches the contact page and sees the enquiry form
    Given a visitor wants to get in touch with the coach
    When the visitor opens the contact page
    Then the visitor sees fields for their name, email address, and message
    And the visitor sees a button to send the enquiry

  @driving_port
  Scenario: Visitor submits a complete enquiry and receives a confirmation
    Given a visitor is on the contact page
    And the visitor has entered their name as "Alex Rivera"
    And the visitor has entered their email address as "alex@example.com"
    And the visitor has entered a message saying "I would like to discuss a leadership coaching engagement"
    When the visitor sends the enquiry
    Then the visitor sees a message confirming their enquiry has been received
    And the visitor understands the coach will respond shortly

  @driving_port
  Scenario: The enquiry form is registered with the form processing service
    Given a visitor opens the contact page
    Then the enquiry form is configured to be captured by the form processing service

  # -------------------------------------------------------------------------
  # Contact form — error paths (target: 40%+ of total scenarios)
  # -------------------------------------------------------------------------

  @driving_port
  Scenario: Visitor who submits without filling any fields is told what is missing
    Given a visitor is on the contact page
    When the visitor tries to send the enquiry without entering any details
    Then the visitor is shown at least one message explaining what information is needed

  @driving_port
  Scenario: Visitor who omits their name is told their name is required
    Given a visitor is on the contact page
    And the visitor has entered their email address as "alex@example.com"
    And the visitor has entered a message saying "Hello"
    When the visitor tries to send the enquiry without entering their name
    Then the visitor sees a message indicating a name is required

  @driving_port
  Scenario: Visitor who enters a malformed email address is told the format is invalid
    Given a visitor is on the contact page
    And the visitor has entered their name as "Alex Rivera"
    And the visitor has entered "not-an-email" as their email address
    And the visitor has entered a message saying "Hello"
    When the visitor tries to send the enquiry
    Then the visitor sees a message indicating the email address format is not valid

  @driving_port
  Scenario: Visitor who omits their message is told a message is required
    Given a visitor is on the contact page
    And the visitor has entered their name as "Alex Rivera"
    And the visitor has entered their email address as "alex@example.com"
    When the visitor tries to send the enquiry without entering a message
    Then the visitor sees a message indicating a message is required

  @driving_port
  Scenario: Visitor on a page that does not exist is not shown a server error
    Given a visitor navigates to a page that does not exist on the site
    Then the visitor sees a page-not-found response
    And the visitor is not shown a server error

  # -------------------------------------------------------------------------
  # Swoopy embed — /systems page
  # -------------------------------------------------------------------------

  @driving_port
  Scenario: Visitor on the systems page sees the interactive diagram tool
    Given a visitor is interested in the coach's systems thinking approach
    When the visitor opens the systems page
    Then the visitor sees an embedded interactive diagram tool

  @driving_port
  Scenario: The diagram tool is served from the same site as the coaching pages
    Given a visitor is on the systems page with the embedded diagram
    Then the diagram is delivered from the same web address as the rest of the site

  @driving_port
  Scenario: The diagram tool is accessible to visitors using screen readers
    Given a visitor is on the systems page
    Then the embedded diagram tool has a descriptive title that explains what it shows

  @driving_port
  Scenario: Visitor can access a specific pre-built model via a direct link
    Given a content page embeds a specific named diagram model
    When the visitor opens that page
    Then the embedded diagram opens to the specified model directly

  # -------------------------------------------------------------------------
  # Content rendering — SSG delivers content from markdown
  # -------------------------------------------------------------------------

  @driving_port
  Scenario: Homepage content is delivered from the content files, not hardcoded
    Given the content files contain copy for the homepage
    When a visitor opens the homepage
    Then the visitor sees the heading and introductory text from the content files

  @driving_port
  Scenario: About page content blocks are assembled and shown in declared order
    Given the about page declares multiple content blocks
    When a visitor opens the about page
    Then the visitor sees the content from each block rendered in sequence

  # -------------------------------------------------------------------------
  # Error and edge paths — additional coverage (target >= 40% of scenarios)
  # -------------------------------------------------------------------------

  @driving_port
  Scenario: Validation errors are communicated to visitors using assistive technology
    Given a visitor is on the contact page
    When the visitor tries to send the enquiry without entering any details
    Then each validation message is announced by screen reader software without requiring the visitor to navigate the form

  @driving_port
  Scenario: The send button is unavailable while the enquiry is being delivered
    Given a visitor has filled in their name, email address, and message on the contact page
    When the visitor sends the enquiry
    Then the send button is unavailable until a response is received
    And the visitor sees the button indicate that the message is being sent

  @driving_port
  Scenario: Visitor who navigates to a non-existent about sub-path is not shown a server error
    Given a visitor navigates to a page under the about section that does not exist
    Then the visitor sees a page-not-found response
    And the visitor is not shown a server error

  @driving_port
  Scenario: Visitor who navigates to a non-existent services path is not shown a server error
    Given a visitor navigates to a page under the services section that does not exist
    Then the visitor sees a page-not-found response
    And the visitor is not shown a server error

  @driving_port
  Scenario: Trust signals are present in the initial page load without waiting for the page to finish loading
    Given the homepage delivers content from the server
    When a visitor receives the initial page response
    Then the credentials section is present in the delivered page content
    And the visitor does not need to wait for the page to finish loading to see credentials

  @driving_port
  Scenario: The homepage CTA remains visible when the trust signals section has no enabled credentials
    Given no credentials are currently enabled in the trust signals configuration
    When a visitor opens the homepage
    Then the homepage CTA is still visible
    And the visitor can still reach the contact form

  @driving_port
  Scenario: Visitor who submits an enquiry with only whitespace in the name field sees a name-required error
    Given a visitor is on the contact page
    And the visitor has entered only spaces as their name
    And the visitor has entered their email address as "alex@example.com"
    And the visitor has entered a message saying "Hello"
    When the visitor tries to send the enquiry
    Then the visitor sees a message indicating a name is required

  @driving_port
  Scenario: The embedded diagram on the systems page does not prevent the rest of the site from loading if the diagram tool is unavailable
    Given the diagram tool is not responding
    When a visitor opens the systems page
    Then the rest of the page content is still visible to the visitor
    And the visitor is not shown a site error

  @driving_port
  Scenario: Navigation links remain functional when the visitor is already on that page
    Given a visitor is already on the about page
    When the visitor selects "About" from the navigation again
    Then the visitor remains on the about page without an error

  @driving_port
  Scenario: Visitor who enters an email address with a local domain only sees a format error
    Given a visitor is on the contact page
    And the visitor has entered their name as "Alex Rivera"
    And the visitor has entered "alex@localhost" as their email address
    And the visitor has entered a message saying "Hello"
    When the visitor tries to send the enquiry
    Then the visitor sees a message indicating the email address format is not valid
