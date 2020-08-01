import Layout from '../components/site-layout'
import PageHeader from '../components/page-header'
import PageWrapper from '../components/page-wrapper'

const PrivacyPolicyPage = () => (
  <Layout title="terms of service ~ liten">
    <PageHeader title="Terms of Service" />

    <PageWrapper>
      <h2 className="font-bold text-2xl">1. Terms</h2>
      <p className="my-4 leading-relaxed">
        By accessing the website at{' '}
        <a href="https://liten.xyz">https://liten.xyz</a>, you are agreeing to
        be bound by these terms of service, all applicable laws and regulations,
        and agree that you are responsible for compliance with any applicable
        local laws. If you do not agree with any of these terms, you are
        prohibited from using or accessing this site. The materials contained in
        this website are protected by applicable copyright and trademark law.
      </p>
      <h2 className="font-bold text-2xl">2. Use License</h2>
      <ol type="a" className="my-4 leading-relaxed">
        <li>
          Permission is hereby granted, free of charge, to any person obtaining
          a copy of this software and associated documentation files (the
          "Software"), to deal in the Software without restriction, including
          without limitation the rights to use, copy, modify, merge, publish,
          distribute, sublicense, and/or sell copies of the Software, and to
          permit persons to whom the Software is furnished to do so, subject to
          the following conditions:
          <ol type="i" className="my-4 leading-relaxed">
            <li>
              The above copyright notice and this permission notice shall be
              included in all copies or substantial portions of the Software.
            </li>
          </ol>
        </li>
      </ol>
      <h2 className="font-bold text-2xl">3. Disclaimer</h2>
      <ol type="a">
        <li className="my-4 leading-relaxed">
          The materials on liten's website are provided on an 'as is' basis.
          Liten makes no warranties, expressed or implied, and hereby disclaims
          and negates all other warranties including, without limitation,
          implied warranties or conditions of merchantability, fitness for a
          particular purpose, or non-infringement of intellectual property or
          other violation of rights.
        </li>
        <li className="my-4 leading-relaxed">
          Further, liten does not warrant or make any representations concerning
          the accuracy, likely results, or reliability of the use of the
          materials on its website or otherwise relating to such materials or on
          any sites linked to this site.
        </li>
      </ol>
      <h2 className="font-bold text-2xl">4. Limitations</h2>
      <p className="my-4 leading-relaxed">
        In no event shall liten or its suppliers be liable for any damages
        (including, without limitation, damages for loss of data or profit, or
        due to business interruption) arising out of the use or inability to use
        the materials on liten's website, even if liten or a liten authorized
        representative has been notified orally or in writing of the possibility
        of such damage. Because some jurisdictions do not allow limitations on
        implied warranties, or limitations of liability for consequential or
        incidental damages, these limitations may not apply to you.
      </p>
      <h2 className="font-bold text-2xl">5. Accuracy of materials</h2>
      <p className="my-4 leading-relaxed">
        The materials appearing on liten's website could include technical,
        typographical, or photographic errors. Liten does not warrant that any
        of the materials on its website are accurate, complete or current. Liten
        may make changes to the materials contained on its website at any time
        without notice. However liten does not make any commitment to update the
        materials.
      </p>
      <h2 className="font-bold text-2xl">6. Links</h2>
      <p className="my-4 leading-relaxed">
        Liten has not reviewed all of the sites linked to its website and is not
        responsible for the contents of any such linked site. The inclusion of
        any link does not imply endorsement by liten of the site. Use of any
        such linked website is at the user's own risk.
      </p>
      <h2 className="font-bold text-2xl">7. Modifications</h2>
      <p className="my-4 leading-relaxed">
        Liten may revise these terms of service for its website at any time
        without notice. By using this website you are agreeing to be bound by
        the then current version of these terms of service.
      </p>
      <h2 className="font-bold text-2xl">8. Governing Law</h2>
      <p className="my-4 leading-relaxed">
        These terms and conditions are governed by and construed in accordance
        with the laws of Vancouver BC, Canada and you irrevocably submit to the
        exclusive jurisdiction of the courts in that State or location.
      </p>
    </PageWrapper>
  </Layout>
)

export default PrivacyPolicyPage
