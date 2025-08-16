import Page from '@/components/page'

import TimezoneComparison from '@/components/hero/dual-timezone'

const Index = () => {
	return (
		<Page>
			<TimezoneComparison tz1='Asia/Kolkata' tz2='Europe/Paris' />
		</Page>
	)
}

export default Index
