import Page from '@/components/page'

import TimezoneComparison from '@/components/hero/dual-timezone'

const Index = () => {
	return (
		<Page>
			<TimezoneComparison tz1='Asia/Kolkata' tz2='America/New_York' />
		</Page>
	)
}

export default Index
