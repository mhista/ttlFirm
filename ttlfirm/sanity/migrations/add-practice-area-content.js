
import {createClient} from '@sanity/client'

const client = createClient({
  projectId: '5lgtr8bc', // Replace with your actual project ID
  dataset: 'production',
//   token: 'your-write-token', // Get from sanity.io/manage
  useCdn: false,
  apiVersion: '2024-01-01',
//   perspective: 'published'
})

const practiceAreaContent = {
  1: { // Personal Injury
    overview: [
      {
        _type: 'block',
        style: 'normal',
        children: [{
          _type: 'span',
          text: 'At The Turuchi Law Firm, we understand that an accident or injury can be one of the most devastating experiences of your life. The physical pain, emotional trauma, and financial burden can feel overwhelming. That\'s why we are dedicated to fighting tirelessly for your rights and securing the compensation you deserve.'
        }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{
          _type: 'span',
          text: 'Our personal injury practice covers a wide range of cases including car accidents, truck accidents, motorcycle accidents, pedestrian and bicycle accidents, slip and fall incidents, workplace injuries, dog bites, wrongful death claims, and catastrophic injuries. We handle insurance claim disputes and underinsured/uninsured motorist claims with expertise and determination.'
        }]
      }
    ],
    whyChooseUs: [
      {
        _type: 'block',
        style: 'normal',
        children: [{
          _type: 'span',
          text: 'With extensive experience as a former insurance defense attorney, we understand how insurance companies operate and how they attempt to minimize payouts. This insider knowledge gives us a strategic advantage in negotiating settlements and litigating cases, ensuring our clients receive maximum compensation.'
        }]
      }
    ],
    process: [
      {title: 'Free Consultation', description: 'We review your case at no cost and explain your legal options.'},
      {title: 'Investigation', description: 'We gather evidence, interview witnesses, and build a strong case.'},
      {title: 'Negotiation', description: 'We fight for maximum compensation through settlement negotiations.'},
      {title: 'Litigation', description: 'If needed, we take your case to trial and fight for justice in court.'}
    ],
    faqs: [
      {
        question: 'How much does it cost to hire a personal injury lawyer?',
        answer: [{
          _type: 'block',
          style: 'normal',
          children: [{_type: 'span', text: 'We work on a contingency fee basis, meaning you pay nothing unless we win your case. Our fee is a percentage of the settlement or verdict we recover for you.'}]
        }]
      },
      {
        question: 'How long do I have to file a personal injury claim in New Jersey?',
        answer: [{
          _type: 'block',
          style: 'normal',
          children: [{_type: 'span', text: 'In New Jersey, the statute of limitations for most personal injury cases is two years from the date of the injury. However, there are exceptions, so it\'s important to consult with an attorney as soon as possible.'}]
        }]
      }
    ]
  },
  2: { // Immigration
    overview: [
      {
        _type: 'block',
        style: 'normal',
        children: [{
          _type: 'span',
          text: 'Immigration law is one of the most complex and dynamic areas of the legal system. At The Turuchi Law Firm, we are passionate about helping individuals, families, and businesses navigate this intricate process and achieve their immigration goals.'
        }]
      }
    ],
    process: [
      {title: 'Initial Consultation', description: 'We assess your immigration needs and eligibility for various programs.'},
      {title: 'Document Preparation', description: 'We prepare and file all necessary forms and supporting documents.'},
      {title: 'Application Submission', description: 'We submit your application to USCIS and monitor its progress.'},
      {title: 'Interview Preparation', description: 'We prepare you for any required interviews or hearings.'},
      {title: 'Final Approval', description: 'We guide you through final steps to achieve your immigration goal.'}
    ]
  },
  3: { // Workers' Compensation
    overview: [
      {
        _type: 'block',
        style: 'normal',
        children: [{
          _type: 'span',
          text: 'A workplace injury can disrupt your life in ways you never anticipated. From physical pain and mounting medical bills to lost wages and job insecurity, the aftermath of a work-related injury can be overwhelming.'
        }]
      }
    ],
    process: [
      {title: 'Report Your Injury', description: 'Notify your employer immediately and seek medical attention.'},
      {title: 'File Your Claim', description: 'We help you file your workers\' compensation claim correctly.'},
      {title: 'Medical Treatment', description: 'Get the medical care you need while we handle the legal process.'},
      {title: 'Benefit Recovery', description: 'We ensure you receive all benefits you\'re entitled to.'}
    ]
  },
  4: { // Municipal Court
    overview: [
      {
        _type: 'block',
        style: 'normal',
        children: [{
          _type: 'span',
          text: 'At The Turuchi Law Firm, we provide comprehensive legal services for a wide range of municipal court matters. Whether you\'re facing traffic violations, disorderly persons offenses, or other municipal charges, we have the experience and dedication to protect your rights.'
        }]
      }
    ],
    process: [
      {title: 'Case Review', description: 'We analyze the charges and evidence against you.'},
      {title: 'Court Representation', description: 'We appear in court on your behalf.'},
      {title: 'Negotiation', description: 'We work to reduce charges or penalties.'},
      {title: 'Resolution', description: 'We fight for the best possible outcome in your case.'}
    ]
  }
}

async function migratePracticeAreas() {
  console.log('Starting practice area content migration...')
  
  for (const [practiceId, content] of Object.entries(practiceAreaContent)) {
    try {
      // Find the practice area by ID
      const practiceArea = await client.fetch(
        `*[_type == "practiceArea" && id == ${practiceId}][0]`
      )
      
      if (!practiceArea) {
        console.log(`Practice area with ID ${practiceId} not found, skipping...`)
        continue
      }
      
      console.log(`Updating practice area: ${practiceArea.name}`)
      
      // Update the practice area with new content
      await client
        .patch(practiceArea._id)
        .set({
          overview: content.overview,
          whyChooseUs: content.whyChooseUs,
          process: content.process,
          faqs: content.faqs
        })
        .commit()
      
      console.log(`✓ Successfully updated ${practiceArea.name}`)
    } catch (error) {
      console.error(`Error updating practice area ${practiceId}:`, error)
    }
  }
  
  console.log('Migration complete!')
}