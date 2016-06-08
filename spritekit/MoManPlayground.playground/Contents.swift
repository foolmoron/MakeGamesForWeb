//: Playground - noun: a place where people can play

import SpriteKit
import XCPlayground

struct Constants {
	static let gameWindow = CGRect(x: 0, y: 0, width: 800, height: 600)
	static let margins = UIEdgeInsets(top: 16, left: 16, bottom: 16, right: 16)
}

class GameScene: SKScene {
	
	var target: SKSpriteNode?
	
	override init(size: CGSize) {
		super.init(size: size)
		
		setup()
	}
	
	required init?(coder aDecoder: NSCoder) {
		fatalError("init(coder:) has not been implemented")
	}
	
	func setup() {
		setupBackground()
		setupTarget()
	}
	
	func setupBackground() {
		let background = SKSpriteNode(imageNamed: "bg")
		background.anchorPoint = CGPoint.zero
		addChild(background)
	}
	
	func setupTarget() {
		target = SKSpriteNode(imageNamed: "target")
		guard let target = target else {
			fatalError()
		}
		addChild(target)
		randomizeTargetPosition()
	}
	
	func randomizeTargetPosition() {
		guard let target = target else {
			return
		}
		let randomXFactor = Double(arc4random() % 100) / 100.0
		let randomYFactor = Double(arc4random() % 100) / 100.0
		
		let randomX = Double(Constants.gameWindow.width) * randomXFactor
		let randomY = Double(Constants.gameWindow.height) * randomYFactor
		
		let minX = Double(Constants.margins.left)
		let maxX = Double(Constants.gameWindow.width - Constants.margins.right)
		let minY = Double(Constants.margins.bottom)
		let maxY = Double(Constants.gameWindow.height - Constants.margins.top)
		
		let actualX = max(min(randomX, maxX), minX)
		let actualY = max(min(randomY, maxY), minY)
		
		target.position = CGPoint(x: actualX, y: actualY)
	}
	
	override func touchesBegan(touches: Set<UITouch>, withEvent event: UIEvent?) {
		for touch in touches {
			if let target = target where target.frame.contains(touch.locationInNode(self)) {
				randomizeTargetPosition()
			}
		}
	}
}

//:- Main
var scene = GameScene(size: Constants.gameWindow.size)
let view = SKView(frame: Constants.gameWindow)
view.presentScene(scene)

XCPlaygroundPage.currentPage.liveView = view
